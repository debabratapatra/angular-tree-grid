export interface Column {
  header?: string;
  name: string;
  css_class?: string;
  sorted?: number;
  sort_type?: number;
  editable?: Boolean;
  sortable?: Boolean;
  filter?: Boolean;
  hidden?: Boolean;
  width?: string;
  renderer?: any;
  header_renderer?: any;
  type?: string;
  component?: any;
  editor?: any;
  on_component_init?: any;
  case_sensitive_filter?: Boolean;
  summary_renderer?: any;
  filter_function?: any;
}
