export interface Column {
    header?: string;
    name?: string;
    sorted: number;
    sort_type: string;
    editable: Boolean;
    filter: Boolean;
    hidden: Boolean;
    width?: string;
    renderer?: any;
    type?: string;
    component?: any;
    editor?: any;
    onComponentInit?: any;
    case_sensitive_filter: Boolean;
}
