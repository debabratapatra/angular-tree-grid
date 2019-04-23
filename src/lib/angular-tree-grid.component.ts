import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Configs } from './models/Configs.model';
import { AngularTreeGridService } from './angular-tree-grid.service';
import { Column } from './models/Column.model';

@Component({
  selector: 'db-angular-tree-grid',
  templateUrl: 'angular-tree-grid.component.html',
  styleUrls: ['./angular-tree-grid.component.scss']
})
export class AngularTreeGridComponent implements OnChanges {
  processed_data: any[] = [];
  expand_tracker: Object = {};
  columns: Column[] = [];

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

   @Output() cellclick: EventEmitter<any> = new EventEmitter();
   @Output() expand: EventEmitter<any> = new EventEmitter();
   @Output() collapse: EventEmitter<any> = new EventEmitter();

  constructor(private angularTreeGridService: AngularTreeGridService) { }

  ngOnChanges() {
    this.setDefaultConfigs();
    this.setColumnNames();
    this.angularTreeGridService.processData(this.data, this.processed_data, this.expand_tracker, this.configs);
  }

  setDefaultConfigs() {
    this.processed_data = [];
    this.configs = Object.assign({}, this.default_configs, this.configs);

    if (!this.configs.id_field) {
      window.console.error('id field is mandatory!');
    }

    if (!this.configs.parent_id_field) {
      window.console.error('parent_id field is mandatory!');
    }
  }

  setColumnNames() {
    this.columns = this.configs.columns ? this.configs.columns : [];

    // If columns doesn't exist in user's object.
    if (!this.configs.columns) {
      const column_keys = Object.keys(this.data[0]);

      // Insert Header and default configuration.
      column_keys.forEach(key => {
        this.columns.push(Object.assign({'header': key, 'name': key}, this.default_column_config));
      });
    } else {

      // Insert Header and default configuration.
      for (let i = 0; i < this.columns.length; i++) {
        this.columns[i] = Object.assign({}, this.default_column_config, this.columns[i]);
      }
    }
  }

}
