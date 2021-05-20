<template>
  <div>
    <b-row v-if="dashboard.attributes">
      <b-col cols="*" md="6">
        <process-card
          :name="dashboard.attributes.name"
          :icon="dashboard.attributes.icon"
          :description="dashboard.attributes.description"
        />
      </b-col>
      <b-col cols="*" md="6">
        <dl>
          <dt>{{ __("Creación") }}</dt>
          <dd>{{ $dayjs(instance.attributes.created_at).fromNow() }}</dd>
          <dt>{{ __("Ultima modificación") }}</dt>
          <dd>{{ $dayjs(instance.attributes.updated_at).fromNow() }}</dd>
        </dl>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="12">
        <b-tabs>
          <b-tab :title="__('Código')" active>
            <div class="d-flex flex-row h-100 w-100">
              <div v-if="dashboard.relationships" class="border p-2">
                <b-link
                  v-for="(row, index) in dashboard.relationships.folder"
                  :key="`folder-row-${index}`"
                  class="text-nowrap d-block"
                  :class="`pl-${row.attributes.level * 4} ${
                    selected == row ? 'bg-light' : ''
                  }`"
                  @click="loadFile(row)"
                >
                  <i class="text-primary" :class="iconOf(row)"></i>
                  {{ row.attributes.name }}
                </b-link>
              </div>
              <div
                v-if="editor == 'code' && code !== null"
                class="flex-grow-1 overflow-hidden border"
              >
                <b-button-toolbar
                  key-nav
                  aria-label="Code toolbar"
                  class="bg-white p-3 border-bottom justify-content-end"
                >
                  <div class="flex-grow-1 text-left">
                    {{ selected.id }}
                  </div>
                  <b-button-group class="mx-1" size="sm">
                    <b-button variant="secondary" @click="saveCode">
                      <i class="fas fa-save mr-1"></i>{{ __("Save") }}
                    </b-button>
                  </b-button-group>
                </b-button-toolbar>
                <monaco-editor
                  v-model="code"
                  language="html"
                  style="height: 90vh"
                  :options="monacoOptions"
                />
              </div>
              <div
                v-if="editor == 'bpmn'"
                class="flex-grow-1 overflow-hidden border position-relative"
              >
                <process-diagram
                  ref="diagram"
                  v-show="diagramMode"
                  v-model="code"
                  @saved="saveBpmn"
                  @edit-script="editScript"
                  style="height: 90vh"
                />
                <div v-if="!diagramMode">
                  <b-button-toolbar
                    key-nav
                    aria-label="Code toolbar"
                    class="bg-white p-3 border-bottom justify-content-end"
                  >
                    <b-button-group class="mx-1" size="sm">
                      <b-button variant="light" @click="cancelEditScript">
                        <i class="fas fa-times mr-1"></i>{{ __("Cancel") }}
                      </b-button>
                      <b-button variant="secondary" @click="applyScript">
                        <i class="fas fa-check mr-1"></i>{{ __("Apply") }}
                      </b-button>
                    </b-button-group>
                  </b-button-toolbar>
                  <monaco-editor
                    v-model="script"
                    language="php"
                    style="height: 90vh"
                    :options="monacoOptions"
                  />
                </div>
              </div>
              <div
                v-if="editor == 'image'"
                class="flex-grow-1 overflow-auto border"
              >
                <img :src="selected.attributes.url" />
              </div>
              <div
                v-if="editor == 'folder'"
                class="flex-grow-1 overflow-auto border position-relative"
              >
                <div class="m-2 d-flex justify-content-center flex-wrap">
                  <b-card class="mr-2">
                    {{ __("Upload files") }}
                    <b-form-file
                      v-model="files"
                      :placeholder="__('Choose a file or drop it here...')"
                      :drop-placeholder="__('Drop file here...')"
                      multiple
                    ></b-form-file>
                    <b-button variant="primary" @click="upload">{{
                      __("Upload")
                    }}</b-button>
                  </b-card>
                  <b-card
                    v-for="(template, index) in viewsTemplates"
                    :key="`view-tpl-${index}`"
                    class="mr-2"
                  >
                    <b-button
                      variant="primary"
                      class="d-block mb-2"
                      @click="newViewFileFrom(template)"
                    >
                      {{ __("Add screen") }}<br />
                      {{ template.name }}
                    </b-button>
                    <img :src="template.svg" height="46px" />
                  </b-card>
                </div>
                <b-overlay :show="promptNewName" no-wrap @shown="onPromptShown">
                  <template #overlay>
                    <div v-if="processing" class="text-center p-4">
                      <div class="mb-3">{{ __("Processing...") }}</div>
                    </div>
                    <div
                      v-else
                      ref="dialog"
                      tabindex="-1"
                      role="dialog"
                      aria-modal="false"
                      aria-labelledby="form-prompt-label"
                      class="text-center p-3"
                    >
                      <p>
                        <b-form-group
                          id="group-new_view_name"
                          :label="__('Name')"
                          label-for="new_view_name"
                        >
                          <b-form-input
                            ref="new_view_name"
                            id="new_view_name"
                            v-model="newViewName"
                            type="text"
                            required
                          />
                        </b-form-group>
                      </p>
                      <div class="d-flex">
                        <b-button
                          variant="outline-danger"
                          class="mr-3"
                          @click="promptNewName = false"
                        >
                          {{ __("Cancel") }}
                        </b-button>
                        <b-button
                          variant="outline-success"
                          @click="createNewViewFile"
                          >{{ __("Save") }}</b-button
                        >
                      </div>
                    </div>
                  </template>
                </b-overlay>
              </div>
            </div>
          </b-tab>
          <b-tab :title="__('Properties')">
            <b-form
              v-if="dashboard.attributes"
              @submit.prevent="saveProperties"
            >
              <b-form-group
                id="group-name"
                label="Nombre del módulo"
                label-for="name"
                description="Nombre del módulo"
              >
                <b-form-input
                  id="name"
                  v-model="dashboard.attributes.name"
                  type="text"
                  required
                  placeholder="nombre del módulo"
                />
              </b-form-group>
              <b-form-group
                id="group-description"
                label="Descripción"
                label-for="description"
                description="Descripción"
              >
                <b-form-textarea
                  id="description"
                  v-model="dashboard.attributes.description"
                  type="text"
                  placeholder="Descripción del módulo"
                />
              </b-form-group>
              <b-form-group
                id="group-icon"
                label="Icono"
                label-for="icon"
                description="Icono que se mostrará a la izquierda del nombre de módulo"
              >
                <icon-selector
                  id="icon"
                  v-model="dashboard.attributes.icon"
                  placeholder="icon name"
                />
              </b-form-group>
              <b-form-group
                id="group-role"
                label="Role"
                label-for="role"
                description="Elija un rol que defina los permisos de su módulo."
              >
                <b-form-input
                  id="role"
                  v-model="dashboard.attributes.role"
                  type="text"
                  required
                  placeholder="role"
                  list="roles-datalist"
                />
                <datalist id="roles-datalist">
                  <option v-for="role in roles" :key="`role-${role}`">
                    {{ role }}
                  </option>
                </datalist>
              </b-form-group>
              <div class="text-right">
                <b-button variant="primary" type="submit">{{
                  __("Save")
                }}</b-button>
              </div>
            </b-form>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  mixins: [window.ResourceMixin],
  props: {
    instance: Object,
    token: Object,
    data: Object,
  },
  data() {
    return {
      processing: false,
      newViewName: this.__("new_file.vue"),
      promptNewName: false,
      files: [],
      roles: ["admin", "user"],
      editor: "code",
      diagramMode: true,
      code: null,
      script: "",
      scriptOwner: null,
      selected: null,
      monacoOptions: {
        automaticLayout: true,
        minimap: { enabled: false },
      },
      dashboard: this.$api.dashboard.row(this.data.dashboardId, {
        include: "folder",
      }),
      viewsTemplates: this.$api.dashboard.rowCall(
        this.data.dashboardId,
        "getViewTemplates",
        {}
      ),
    };
  },
  watch: {
    "dashboard.relationships.folder"() {
      if (!this.selected && this.dashboard.relationships.folder.length) {
        const main = this.dashboard.relationships.folder.find(
          (folder) =>
            folder.attributes.name === this.dashboard.attributes.bpmn ||
            folder.attributes.name === this.dashboard.attributes.screen
        );
        this.loadFile(main || this.dashboard.relationships.folder[0]);
      }
    },
  },
  methods: {
    newViewFileFrom(template) {
      this.viewTemplate = template;
      this.promptNewName = true;
    },
    onPromptShown() {
      this.$refs.new_view_name.focus();
    },
    createNewViewFile() {
      this.processing = true;
      this.$api.dashboard
        .call(this.data.dashboardId, "createFromTemplate", {
          template: this.viewTemplate,
          name: this.newViewName,
        })
        .then(() => {
          this.promptNewName = false;
          this.refresh();
        })
        .finally(() => {
          this.processing = false;
        });
    },
    saveProperties() {
      this.$api.dashboard.save({
        id: this.dashboard.id,
        attributes: this.dashboard.attributes,
      });
    },
    readFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (event) {
          resolve(event.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    async upload() {
      const files = [];
      for (let i = 0, l = this.files.length; i < l; i++) {
        files.push({
          name: this.files[i].name,
          content: await this.readFile(this.files[i]),
        });
      }
      this.$api.dashboard
        .call(this.data.dashboardId, "uploadAssets", {
          files,
        })
        .then(() => {
          this.refresh();
        });
    },
    refresh() {
      this.$api.dashboard.refresh(this.dashboard, {
        include: "folder",
      });
    },
    cancelEditScript() {
      this.diagramMode = true;
    },
    applyScript() {
      this.scriptOwner.updateScript(this.script);
      this.diagramMode = true;
    },
    editScript(code, owner) {
      this.script = code;
      this.scriptOwner = owner;
      this.diagramMode = false;
    },
    saveBpmn(bpmn, svg) {
      this.$api.dashboard
        .call(this.data.dashboardId, "saveBpmn", {
          path: this.selected.attributes.id,
          bpmn,
          svg,
        })
        .then(() => {
          this.$api.dashboard.refresh(this.dashboard, {
            include: "folder",
          });
        });
    },
    saveCode() {
      this.$api.dashboard
        .call(this.data.dashboardId, "saveCode", {
          path: this.selected.attributes.id,
          code: this.code,
        })
        .then(() => {
          this.$api.dashboard.refresh(this.dashboard, {
            include: "folder",
          });
        });
    },
    loadFile(row) {
      this.selected = row;
      this.$api.dashboard
        .call(this.data.dashboardId, "getCode", {
          path: row.attributes.id,
        })
        .then((code) => {
          if (row.attributes.mime_type === "application/x-bpmn") {
            this.diagramMode = true;
            this.editor = "bpmn";
          } else if (row.attributes.mime_type.substr(0, 6) === "image/") {
            this.editor = "image";
          } else if (row.attributes.mime_type === "directory") {
            this.editor = "folder";
          } else {
            this.editor = "code";
          }
          this.code = code;
        });
    },
    iconOf(row) {
      if (row.attributes.mime_type === "directory") {
        return "fas fa-folder";
      }
      if (row.attributes.mime_type.substr(0, 6) === "image/") {
        return "far fa-file-image";
      }
      return "far fa-file";
    },
  },
};
</script>

<style>
</style>