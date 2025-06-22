export interface SpecificWorkflowResponse {
  statusCode: number;
  body: Body;
  headers: Headers;
}

export interface Body {
  item: SpecificWorkflowItem[];
  data_size: number;
}

export interface SpecificWorkflowItem {
  _id: string;
  chat_history: ChatHistory;
  display_workflow_name: string;
  fork_count: number;
  key: string;
  lastUpdated: number;
  like: boolean;
  module_tag: string[];
  share: boolean;
  user_email: string;
  workflow: Workflow3;
}

export interface ChatHistory {
  dataset_selection_1: DatasetSelection1[];
  filter_1: Filter1[];
  qspr_1: Qspr1[];
  qspr_results_1: QsprResults1[];
  workflow: Workflow[];
}

export interface DatasetSelection1 {
  id: string;
  user: string;
  system: string;
  params: any;
  return_params: boolean;
}

export interface Filter1 {
  id: string;
  user: string;
  system: string;
  params: any;
  return_params: boolean;
}

export interface Qspr1 {
  id: string;
  user: string;
  system: string;
  params: any;
  return_params: boolean;
}

export interface QsprResults1 {
  id: string;
  user: string;
  system: string;
  params: any;
  return_params: boolean;
}

export interface Workflow {
  id: string;
  user: string;
  system: string;
  workflow: Workflow2;
  return_workflow: boolean;
}

export interface Workflow2 {
  dataset_selection_1: DatasetSelection12;
  filter_1: Filter12;
  qspr_1: Qspr12;
  qspr_results_1: QsprResults12;
}

export interface DatasetSelection12 {
  module_type: string;
  display_name: string;
  prevNode: any;
  nextNode: string;
  params: Params;
  source_position: string;
  target_position: string;
  position: Position;
}

export interface Params {}

export interface Position {
  x: number;
  y: number;
}

export interface Filter12 {
  module_type: string;
  display_name: string;
  prevNode: string;
  nextNode: string;
  params: Params2;
  source_position: string;
  target_position: string;
  position: Position2;
}

export interface Params2 {}

export interface Position2 {
  x: number;
  y: number;
}

export interface Qspr12 {
  module_type: string;
  display_name: string;
  prevNode: string;
  nextNode: string;
  params: Params3;
  source_position: string;
  target_position: string;
  position: Position3;
}

export interface Params3 {}

export interface Position3 {
  x: number;
  y: number;
}

export interface QsprResults12 {
  module_type: string;
  display_name: string;
  prevNode: string;
  nextNode: any;
  params: Params4;
  source_position: string;
  target_position: string;
  position: Position4;
}

export interface Params4 {}

export interface Position4 {
  x: number;
  y: number;
}

export interface Workflow3 {
  dataset_selection_1: DatasetSelection13;
  filter_1: Filter13;
  qspr_1: Qspr13;
  qspr_results_1: QsprResults13;
}

export interface DatasetSelection13 {
  module_type: string;
  display_name: string;
  prevNode: any;
  nextNode: string;
  params: Params5;
  source_position: string;
  target_position: string;
  position: Position5;
}

export interface Params5 {
  dataset_id: string;
  dataset_type: string;
}

export interface Position5 {
  x: number;
  y: number;
}

export interface Filter13 {
  module_type: string;
  display_name: string;
  prevNode: string;
  nextNode: string;
  params: Params6;
  source_position: string;
  target_position: string;
  position: Position6;
}

export interface Params6 {}

export interface Position6 {
  x: number;
  y: number;
}

export interface Qspr13 {
  module_type: string;
  display_name: string;
  prevNode: string;
  nextNode: string;
  params: Params7;
  source_position: string;
  target_position: string;
  position: Position7;
}

export interface Params7 {}

export interface Position7 {
  x: number;
  y: number;
}

export interface QsprResults13 {
  module_type: string;
  display_name: string;
  prevNode: string;
  nextNode: any;
  params: Params8;
  source_position: string;
  target_position: string;
  position: Position8;
}

export interface Params8 {}

export interface Position8 {
  x: number;
  y: number;
}

export interface Headers {
  "Content-Type": string;
}
