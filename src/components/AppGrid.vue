<template>
  <table>
    <tr>
      <th class="bg-light px-2 border"></th>
      <th v-for="i in cols" :key="`col-${i}`" class="bg-light px-2 border text-center">
        {{ headerOrcolumn(i) }}
      </th>
    </tr>
    <tr v-for="n in rows" :key="`row-${n}`">
      <th class="bg-light px-2 border text-center">{{ n }}</th>
      <td
        v-for="i in cols"
        :key="`cell-${n}-${i}`"
        class="bg-white cell-padding border"
        :class="getCellClass(n, i)"
        @click="selectCell(n, i)"
        @blur="updateData()"
        :contenteditable="n === row && i === col"
      >
        {{ (value[n - 1] && value[n - 1][i - 1]) || "" }}
      </td>
    </tr>
  </table>
</template>

<script>
import { isEqual } from "lodash";
export default {
  props: {
    cols: { default: 3 },
    rows: { default: 3 },
    rich: { default: false },
    headers: Array,
    cellClass: {
      default() {
        return {};
      },
    },
    value: {
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      row: 1,
      col: 1,
      listener: null,
    };
  },
  methods: {
    getCellClass(row, col) {
      const css = [];
      if (row === this.row && col === this.col) css.push("cell-cursor");
      const alphaCol = this.column(col);
      const alphaRow = `${row}`;
      const alphaCell = `${alphaCol}${alphaRow}`;
      if (this.cellClass[alphaCol]) css.push(this.cellClass[alphaCol]);
      if (this.cellClass[alphaRow]) css.push(this.cellClass[alphaRow]);
      if (this.cellClass[alphaCell]) css.push(this.cellClass[alphaCell]);
      if (this.cellClass['*']) css.push(this.cellClass['*']);
      return css.join(" ");
    },
    keyup(event) {
      if (!this.$el.contains(event.originalTarget || event.target)) {
        return;
      }
      const keyName = event.key;
      let move = false;
      switch (keyName) {
        case "ArrowUp":
          this.row = this.row <= 1 ? this.rows : this.row - 1;
          move = true;
          break;
        case "ArrowLeft":
          this.col = this.col <= 1 ? this.cols : this.col - 1;
          move = true;
          break;
        case "ArrowDown":
          this.row = this.row >= this.rows ? 1 : this.row + 1;
          move = true;
          break;
        case "ArrowRight":
          this.col = this.col >= this.cols ? 1 : this.col + 1;
          move = true;
          break;
        case "Enter":
          if (this.row >= this.rows) {
            this.row = 1;
            this.col = this.col >= this.cols ? 1 : this.col + 1;
          } else {
            this.row++;
          }
          move = true;
          event.preventDefault();
          break;
        case "Tab":
          if (this.col >= this.cols) {
            this.col = 1;
            this.row = this.row >= this.rows ? 1 : this.row + 1;
          } else {
            this.col++;
          }
          move = true;
          event.preventDefault();
          break;
      }
      if (move) {
        this.selectCell(this.row, this.col);
      }
      this.updateData();
    },
    updateData() {
      const data = [];
      for (let r = 1; r <= this.rows; r++) {
        const row = [];
        for (let c = 1; c <= this.cols; c++) {
          const value = this.rich
            ? this.$el.rows[r].cells[c].innerHTML
            : this.$el.rows[r].cells[c].innerText;
          row.push(value);
        }
        data.push(row);
      }
      if (!isEqual(data, this.value)) {
        this.$emit("input", data);
      }
    },
    selectCell(row, col) {
      this.row = row;
      this.col = col;
      this.$nextTick(() => {
        this.$el.rows[this.row].cells[this.col].focus();
        setTimeout(() => {
          document.execCommand("selectall", null, false);
        });
      });
    },
    headerOrcolumn(i) {
      if (this.headers) {
        return this.headers[i-1] || this.column(i);
      }
      return this.column(i);
    },
    column(i) {
      i--;
      return (
        (i >= 26 ? String.fromCharCode(64 + parseInt(i / 26)) : "") +
        String.fromCharCode(65 + (i % 26))
      );
    },
  },
  mounted() {
    document.addEventListener("keydown", this.keyup, false);
  },
  destroyed() {
    document.removeEventListener("keydown", this.keyup);
  },
};
//  border: 2px double blue !important;
</script>

<style>
.cell-padding {
  padding: 1px 8px;
  cursor: cell;
}
.cell-cursor {
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 255, 1) inset;
  -webkit-box-shadow: 0px 0px 0px 2px rgba(0, 0, 255, 1) inset;
  -moz-box-shadow: 0px 0px 0px 2px rgba(0, 0, 255, 1) inset;
}
.cell-padding textarea {
  border: none;
  min-width: 1px;
}
</style>