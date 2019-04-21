import { Component, OnChanges, Input } from '@angular/core';
import { Configs } from './models/Configs.model';
import { AngularTreeViewService } from './angular-tree-view.service';
import { Column } from './models/Column.model';

@Component({
  selector: 'db-angular-tree-view',
  templateUrl: 'angular-tree-view.component.html',
  styleUrls: ['./angular-tree-view.component.scss']
})
export class AngularTreeViewComponent implements OnChanges {
  processed_data: any[] = [];
  expand_tracker: Object = {};

  @Input()
  data: any[];

  @Input()
  configs: Configs;

  default_configs: Configs = {
    css: {
      expand_class: 'plus',
      collapse_class: 'minus',
      add_class: 'plus',
      edit_class: '',
      delete_class: '',
      save_class: '',
      cancel_class: ''
    },
    data_loading_text: 'Loading...',
    row_class_function: () => true
  };
  default_column_config: Column = {
    sorted: 0,
    sort_type: null,
    editable: false,
    hidden: false,
    sortable: true
  };

  constructor(private angularTreeViewService: AngularTreeViewService) { }

  ngOnChanges() {
    this.setDefaultConfigs();
    this.angularTreeViewService.processData(this.data, this.processed_data, this.expand_tracker, this.configs);
  }

  setDefaultConfigs() {
    this.processed_data = [];
    this.configs = Object.assign({}, this.default_configs, this.configs);

    if (!this.configs.id) {
      window.console.error('id field is mandatory!');
    }

    if (!this.configs.parent_id) {
      window.console.error('parent_id field is mandatory!');
    }
  }

}
