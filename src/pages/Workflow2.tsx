import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import workflowData from "../assets/get_specific_workflow_result1.json";
import WorkflowNode from "../components/WorkflowNode";
import Viztein from "viztein";

const workflowObj = workflowData.body.item[0].workflow;

const nodes = Object.entries(workflowObj).map(([id, node]) => ({
  id,
  type: "workflowNode",
  position: node.position,
  data: {
    display_name: node.display_name,
    module_type: node.module_type,
  },
}));

const edges = Object.entries(workflowObj)
  .filter(([_, node]) => node.nextNode)
  .map(([id, node]) => ({
    id: `${id}-${node.nextNode}`,
    source: id,
    target: node.nextNode,
    type: "smoothstep",
  }));

const nodeTypes = {
  workflowNode: WorkflowNode,
};

export default function Workflow2() {
  return (
    <div style={{ width: "100%", height: 1000 }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
      {/* <Viztein data={{ filename: "../assets/1BNO.pdb" }} /> */}
    </div>
  );
}
