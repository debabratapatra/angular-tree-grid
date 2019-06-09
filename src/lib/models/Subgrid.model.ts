
import { Column } from './Column.model';

export interface Subgrid {
    id_field?: string;
    show_summary_row: boolean;
    columns?: Column[];
}
