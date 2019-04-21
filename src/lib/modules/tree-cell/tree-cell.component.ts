import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Column } from '../../models/Column.model';
import { Configs } from '../../models/Configs.model';

@Component({
  selector: 'db-tree-cell',
  templateUrl: './tree-cell.component.html',
  styleUrls: ['./tree-cell.component.scss']
})
export class TreeCellComponent implements OnInit {
  @Input()
  configs: Configs;

  @Input()
  index: number;

  @Input()
  row_data: any;

  @Input()
  column: Column;

  @Input()
  cellclick: EventEmitter<any>;

  @Output() rowexpand: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.row_data);
  }

  onCellClick(event) {
    if (this.index === 0 && !this.row_data.leaf) {
      this.rowexpand.emit({event: event, data: this.row_data});
    }
    this.cellclick.emit({event: event, data: this.row_data});
  }

}
