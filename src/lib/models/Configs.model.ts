import { CssClass } from './CssClass.model';
import { Column } from './Column.model';
import { Actions } from './Actions.model';

export interface Configs {
    css: CssClass;
    columns?: Column[];
    data_loading_text: string;
    parent_id_field?: string;
    parent_display_field?: string;
    id_field?: string;
    actions: Actions;
    filter: boolean;
    row_class_function: Function;
    row_edit_function: Function;
    row_delete_function: Function;
}
