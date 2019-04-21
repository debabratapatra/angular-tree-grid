import { Component, OnInit, Input } from '@angular/core';
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
  row_data: Object;

  @Input()
  column: Column;

  constructor() { }

  ngOnInit() {
    console.log(this.row_data);
  }

}
