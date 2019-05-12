import { Component, OnInit, Input } from '@angular/core';
import { Column } from '../../../../models/Column.model';
import { Configs } from '../../../../models/Configs.model';

@Component({
  selector: '[db-filter-row]',
  templateUrl: './filter-row.component.html',
  styleUrls: ['./filter-row.component.scss']
})
export class FilterRowComponent implements OnInit {

  @Input()
  data: any;

  @Input()
  processed_data: any;

  @Input()
  columns: Column[];

  @Input()
  configs: Configs;

  constructor() { }

  ngOnInit() {
  }

  filter(column) {
  }

}
