import { Component, OnInit, Input } from '@angular/core';
import { Column } from '../../../../models/Column.model';
import { Configs } from '../../../../models/Configs.model';
import { Store } from '../../../../store/store';

@Component({
  selector: '[db-filter-row]',
  templateUrl: './filter-row.component.html',
  styleUrls: ['./filter-row.component.scss']
})
export class FilterRowComponent implements OnInit {

  @Input()
  store: Store;

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
