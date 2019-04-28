import { Component, OnInit, Input } from '@angular/core';
import { Configs } from '../../models/Configs.model';
import { Column } from '../../models/Column.model';

@Component({
  selector: '[db-tree-head]',
  templateUrl: './tree-head.component.html',
  styleUrls: ['./tree-head.component.scss']
})
export class TreeHeadComponent implements OnInit {

  @Input()
  data: any[];

  @Input()
  configs: Configs;

  @Input()
  processed_data: any[];

  @Input()
  expand_tracker: Object;

  @Input()
  edit_tracker: any;

  @Input()
  internal_configs: any;

  @Input()
  columns: Column[];

  constructor() { }

  ngOnInit() {
  }

  addRow() {
    this.internal_configs.show_add_row = true;
  }

}
