import { CssClass } from './CssClass.model';
import { Column } from './Column.model';
import { Actions } from './Actions.model';
import { Subgrid } from './Subgrid.model';

export interface Configs {
    css: CssClass;
    columns?: Column[];
    data_loading_text: string;
    rtl_direction: boolean;
    parent_id_field?: string;
    parent_display_field?: string;
    id_field?: string;
    action_column_width?: string;
    actions: Actions;
    filter: boolean;
    multi_select: boolean;
    load_children_on_expand: boolean;
    show_summary_row: boolean;
    subgrid: boolean;
    subgrid_config?: Subgrid;
    show_parent_on_edit: boolean;
    row_class_function: Function;
    row_edit_function: Function;
    row_delete_function: Function;
}
