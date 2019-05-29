import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Configs } from './models/Configs.model';
import { AngularTreeGridService } from './angular-tree-grid.service';
import { Column } from './models/Column.model';
import { Store } from './store/store';

@Component({
  selector: 'db-angular-tree-grid',
  templateUrl: 'angular-tree-grid.component.html',
  styleUrls: ['./angular-tree-grid.component.scss']
})
export class AngularTreeGridComponent implements OnChanges, OnInit {
  processed_data: any[] = [];
  expand_tracker: Object = {};
  columns: Column[] = [];
  edit_tracker: Object = {}; // Track Edit options.
  internal_configs: any = {
    show_add_row: false,
    show_parent_col: false
  };
  store = new Store(this.angularTreeGridService);

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
      cancel_class: '',
      row_selection_class: 'selected',
      header_class: '',
      row_filter_class: ''
    },
    actions: {
      edit: false,
      add: false,
      delete: false,
      resolve_edit: false,
      resolve_add: false,
      resolve_delete: false,
      edit_parent: false
    },
    data_loading_text: 'Loading...',
    filter: false,
    action_column_width: '60px',
    row_class_function: () => true,
    row_edit_function: () => true,
    row_delete_function: () => true
  };
  default_column_config: Column = {
    sorted: 0,
    sort_type: null,
    editable: false,
    hidden: false,
    filter: true,
    case_sensitive_filter: false
  };

   @Output() cellclick: EventEmitter<any> = new EventEmitter();
   @Output() expand: EventEmitter<any> = new EventEmitter();
   @Output() collapse: EventEmitter<any> = new EventEmitter();
   @Output() rowselect: EventEmitter<any> = new EventEmitter();
   @Output() rowadd: EventEmitter<any> = new EventEmitter();
   @Output() rowsave: EventEmitter<any> = new EventEmitter();
   @Output() rowdelete: EventEmitter<any> = new EventEmitter();

  constructor(private angularTreeGridService: AngularTreeGridService) { }

  ngOnInit() {
    if (!this.validateConfigs()) {
      return;
    }
    this.setDefaultConfigs();
    this.setColumnNames();
  }

  ngOnChanges() {
    if (!this.validateConfigs()) {
      return;
    }
    this.setDefaultConfigs();
    this.setColumnNames();
    this.store.processData(
      this.data,
      this.expand_tracker,
      this.configs,
      this.edit_tracker,
      this.internal_configs
    );
  }

  validateConfigs() {
    if (!this.data || this.data.length === 0) {
      window.console.warn('data can\'t be empty!');
      return;
    }
    if (!this.configs) {
      window.console.warn('configs can\'t be empty!');
      return;
    }
    const element = this.data[0];
    let isValidated = true;

    if (!this.configs.id_field) {
      isValidated = false;
      window.console.error('id field is mandatory!');
    }

    if (!this.configs.parent_id_field) {
      isValidated = false;
      window.console.error('parent_id field is mandatory!');
    }

    if (!element.hasOwnProperty(this.configs.id_field)) {
      isValidated = false;
      console.error('id_field doesn\'t exist!');
    }

    if (!element.hasOwnProperty(this.configs.parent_id_field)) {
      isValidated = false;
      console.error('parent_id_field doesn\'t exist!');
    }

    if (!element.hasOwnProperty(this.configs.parent_display_field)) {
      isValidated = false;
      console.error('parent_display_field doesn\'t exist!');
    }

    return isValidated;
  }

  setDefaultConfigs() {
    this.processed_data = [];
    this.configs = Object.assign({}, this.default_configs, this.configs);

    // Deep clone.
    this.configs.actions = Object.assign({}, this.default_configs.actions, this.configs.actions);
    this.configs.css = Object.assign({}, this.default_configs.css, this.configs.css);
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

  collapseAll() {
    this.angularTreeGridService.collapseAll(this.expand_tracker);
  }

  expandAll() {
    this.angularTreeGridService.expandAll(this.expand_tracker);
  }

}
