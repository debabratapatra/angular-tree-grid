export interface Column {
    header?: string;
    name?: string;
    sorted: number;
    sort_type: string;
    editable: Boolean;
    hidden: Boolean;
    sortable: Boolean;
    renderer?: any;
    type?: string;
    component?: any;
    editor?: any;
    onComponentInit?: any;
}
