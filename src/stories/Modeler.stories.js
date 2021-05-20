import '../bootstrap'
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default {
  title: 'Example/Modeler',
  component: 'ProcessDiagram',
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `<process-diagram v-model="bpmn" @saved="download" />`,
  methods: {
    download(bpmn, svg) {
      const zip = new JSZip();
      zip.file('process.bpmn', bpmn);
      zip.file('process.svg', svg);
      zip.generateAsync({ type: "blob" })
        .then(function (content) {
          saveAs(content, "example.zip");
        });
    },
  },
});

export const NewProcess = Template.bind({});
NewProcess.args = {
  bpmn: "",
};


export const LoadProcess = Template.bind({});
LoadProcess.args = {
  bpmn: `<?xml version="1.0" encoding="UTF-8"?>
  <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" id="Definitions_03dabax" targetNamespace="http://bpmn.io/schema/bpmn" exporter="ProcessMaker Modeler" exporterVersion="1.0">
    <bpmn:process id="Process_1" isExecutable="true">
      <bpmn:startEvent id="node_1" name="start">
        <bpmn:outgoing>node_5</bpmn:outgoing>
      </bpmn:startEvent>
      <bpmn:task id="node_2" name="Hello World" pm:assignment="requester">
        <bpmn:incoming>node_5</bpmn:incoming>
        <bpmn:outgoing>node_7</bpmn:outgoing>
      </bpmn:task>
      <bpmn:endEvent id="node_3" name="end">
        <bpmn:incoming>node_7</bpmn:incoming>
      </bpmn:endEvent>
      <bpmn:sequenceFlow id="node_5" sourceRef="node_1" targetRef="node_2" />
      <bpmn:sequenceFlow id="node_7" sourceRef="node_2" targetRef="node_3" />
    </bpmn:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
        <bpmndi:BPMNShape id="node_1_di" bpmnElement="node_1">
          <dc:Bounds x="120" y="230" width="36" height="36" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="node_2_di" bpmnElement="node_2">
          <dc:Bounds x="205" y="210" width="116" height="76" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="node_3_di" bpmnElement="node_3">
          <dc:Bounds x="370" y="230" width="36" height="36" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge id="node_5_di" bpmnElement="node_5">
          <di:waypoint x="138" y="248" />
          <di:waypoint x="263" y="248" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="node_7_di" bpmnElement="node_7">
          <di:waypoint x="263" y="248" />
          <di:waypoint x="388" y="248" />
        </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn:definitions>`,
};
