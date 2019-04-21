import { CssClass } from './CssClass.model';
import { Column } from './Column.model';

export interface Configs {
    css: CssClass;
    columns?: Column[];
    data_loading_text: string;
    row_class_function: Function;
    parent_id_field?: string;
    id_field?: string;
}
