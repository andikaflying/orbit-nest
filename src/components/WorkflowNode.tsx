import React from "react";
import { Handle, Position } from "reactflow";

const WorkflowNode = ({ data }) => (
  <div className="p-3 rounded-lg bg-blue-50 border border-blue-300 min-w-[160px] text-center">
    <div className="font-bold text-blue-800">{data.display_name}</div>
    <div className="text-xs text-blue-600">{data.module_type}</div>
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export default WorkflowNode;
