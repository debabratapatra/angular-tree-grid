import { CssClass } from './CssClass.model';
import { Column } from './Column.model';
import { Actions } from './Actions.model';

export interface Configs {
    css: CssClass;
    columns?: Column[];
    data_loading_text: string;
    row_class_function: Function;
    parent_id_field?: string;
    id_field?: string;
    actions: Actions;
    row_edit_function: any;
    row_delete_function: any;
}
