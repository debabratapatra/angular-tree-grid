import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Column } from '../../models/Column.model';
import { Configs } from '../../models/Configs.model';

@Component({
  selector: 'db-tree-cell',
  templateUrl: './tree-cell.component.html',
  styleUrls: ['./tree-cell.component.scss']
})
export class TreeCellComponent implements OnInit {
  is_expand_column: boolean;
  show_expand_icon: boolean;
  cell_value: string;
  @Input()
  configs: Configs;

  @Input()
  index: number;

  @Input()
  row_data: any;

  @Input()
  column: Column;

  @Input()
  expand_tracker: any;

  @Input()
  cellclick: EventEmitter<any>;

  @Input()
  edit_on: boolean;

  @Output() rowexpand: EventEmitter<any> = new EventEmitter();
  @Output() rowcollapse: EventEmitter<any> = new EventEmitter();
  @Output() canceledit: EventEmitter<any> = new EventEmitter();
  @Output() editcomplete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.is_expand_column = this.index === 0;
    this.show_expand_icon = !this.row_data.leaf;
    this.cell_value = this.row_data[this.column.name];
  }

  expandRow(event) {
    if (this.index === 0 && !this.row_data.leaf) {
      this.rowexpand.emit({event: event, data: this.row_data});
    }
  }

  collapseRow(event) {
    if (this.index === 0 && !this.row_data.leaf) {
      this.rowcollapse.emit({event: event, data: this.row_data});
    }
  }

  onCellClick(event) {
    this.cellclick.emit({event: event, data: this.row_data});
  }

  onEditComplete($event) {
    this.editcomplete.emit({event: $event, data: this.row_data});
  }

}
