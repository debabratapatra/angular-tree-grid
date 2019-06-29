import { Component, OnInit, Input } from '@angular/core';
import { Column } from '../../../../models/Column.model';
import { Configs } from '../../../../models/Configs.model';
import { Store } from '../../../../store/store';
import { AngularTreeGridService } from '../../../../angular-tree-grid.service';

@Component({
  selector: '[db-filter-row]',
  templateUrl: './filter-row.component.html',
  styleUrls: ['./filter-row.component.scss']
})
export class FilterRowComponent implements OnInit {
  search_values: Object = {};

  @Input()
  store: Store;

  @Input()
  columns: Column[];

  @Input()
  expand_tracker: any;

  @Input()
  configs: Configs;

  @Input()
  internal_configs: any;

  constructor(private angularTreeGridService: AngularTreeGridService) { }

  ngOnInit() {
    this.columns.forEach(column => {
      this.search_values[column.name] = '';
    });
  }

  filter() {
    this.store.filterBy(this.columns.map(column => column.name), Object.values(this.search_values));

    // Don't expand for subgrid.
    if (!this.configs.subgrid) {
      this.angularTreeGridService.expandAll(this.expand_tracker);
    }
  }

}
