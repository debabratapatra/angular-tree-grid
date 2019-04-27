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
  @Output() canceledit: EventEmitter<any> = new EventEmitter();
  @Output() editcomplete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.is_expand_column = this.index === 0;
    this.show_expand_icon = !this.row_data.leaf;
  }

  onCellClick(event) {
    if (this.index === 0 && !this.row_data.leaf) {
      this.rowexpand.emit({event: event, data: this.row_data});
    }
    this.cellclick.emit({event: event, data: this.row_data});
  }

  onEditComplete($event) {
    this.editcomplete.emit({event: $event, data: this.row_data});
  }

}
