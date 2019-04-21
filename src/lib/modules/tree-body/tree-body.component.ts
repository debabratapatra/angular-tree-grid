import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Configs } from '../../models/Configs.model';
import { Column } from '../../models/Column.model';

@Component({
  selector: '[db-tree-body]',
  templateUrl: './tree-body.component.html',
  styleUrls: ['./tree-body.component.scss']
})
export class TreeBodyComponent implements OnInit {
  @Input()
  data: any[];

  @Input()
  configs: Configs;

  @Input()
  processed_data: any[];

  @Input()
  expand_tracker: Object;

  @Input()
  columns: Column[];

  @Input()
  cellclick: EventEmitter<any>;

  @Input()
  expand: EventEmitter<any>;

  @Input()
  collapse: EventEmitter<any>;

  constructor() { }

  ngOnInit() {
  }

  onRowExpand(event) {
    const row_data = event.data;
    if (this.expand_tracker[row_data.pathx]) {
      this.collapse.emit(event);
    } else {
      this.expand.emit(event);
    }
    this.expand_tracker[row_data.pathx] = !this.expand_tracker[row_data.pathx];
  }

}
