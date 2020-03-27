export interface Column {
    header?: string;
    name?: string;
    css_class?: string;
    sorted: number;
    sort_type: string;
    editable: Boolean;
    filter: Boolean;
    hidden: Boolean;
    width?: string;
    renderer?: any;
    header_renderer?: any;
    type?: string;
    component?: any;
    editor?: any;
    on_component_init?: any;
    case_sensitive_filter: Boolean;
    summary_renderer?: any;
}
