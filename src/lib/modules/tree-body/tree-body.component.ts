import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Configs } from '../../models/Configs.model';
import { Column } from '../../models/Column.model';
import { AngularTreeGridService } from '../../angular-tree-grid.service';
import { Store } from '../../store/store';

@Component({
  selector: '[db-tree-body]',
  templateUrl: './tree-body.component.html',
  styleUrls: ['./tree-body.component.scss']
})
export class TreeBodyComponent implements OnInit {
  parents: Object[];
  raw_data: any[];
  display_data: any[];

  @Input()
  store: Store;

  @Input()
  configs: Configs;

  @Input()
  expand_tracker: Object;

  @Input()
  edit_tracker: Object;

  @Input()
  internal_configs: any;

  @Input()
  columns: Column[];

  @Input()
  cellclick: EventEmitter<any>;

  @Input()
  expand: EventEmitter<any>;

  @Input()
  collapse: EventEmitter<any>;

  @Input()
  rowdelete: EventEmitter<any>;

  @Input()
  rowsave: EventEmitter<any>;

  @Input()
  rowadd: EventEmitter<any>;

  @Input()
  rowselect: EventEmitter<any>;

  constructor(private angularTreeGridService: AngularTreeGridService) { 
    this.angularTreeGridService.display_data_observable$.subscribe((display_data) => {
      this.display_data = display_data;
    });
  }

  ngOnInit() {

    // Add check as we are running library on changes.
    this.raw_data = this.store.getRawData();
    if (this.raw_data) {
      this.parents = this.raw_data.map(
        element => {
          return {
            'id': element[this.configs.id_field],
            'value': element[this.configs.parent_display_field]
          };
        }
      );
    }

  }

  refreshData(element) {
    // If edit parent is not true then don't refresh.
    if (!this.configs.actions.edit_parent) {
      return;
    }
    element[this.configs.parent_id_field] = parseInt(element[this.configs.parent_id_field], 10);
    this.expand_tracker = {};
    this.edit_tracker = {};
    this.store.processData(
      this.store.getRawData(),
      this.expand_tracker,
      this.configs,
      this.edit_tracker,
      this.internal_configs
    );
  }

  onRowExpand(event) {
    const row_data = event.data;
    this.expand_tracker[row_data.pathx] = true;
    this.expand.emit(event);
  }

  onRowCollapse(event) {
    const row_data = event.data;
    this.expand_tracker[row_data.pathx] = false;

    // Collapse all of its children.
    const keys = Object.keys(this.expand_tracker);
    keys.forEach(key => {
      if (key.includes(row_data.pathx)) {
        this.expand_tracker[key] = 0;
      }
    });

    this.collapse.emit(event);
  }

  saveRecord($event) {
    const element = $event.data;

    if (this.configs.actions.resolve_edit) {
      const promise = new Promise((resolve, reject) => {
        this.rowsave.emit({
          data: element,
          resolve: resolve
        });
      });

      promise.then(() => {
        this.edit_tracker[element['idx']] = false;
        this.internal_configs.show_parent_col = false;
        this.refreshData(element);
      }).catch((err) => {});
    } else {
      this.edit_tracker[element['idx']] = false;
      this.internal_configs.show_parent_col = false;
      this.refreshData(element);
      this.rowsave.emit(element);
    }
  }

  addRow(element) {
    this.refreshData(element);
    this.rowadd.emit(element);
  }

  cancelEdit(index) {
    this.edit_tracker[index] = false;
    this.internal_configs.show_parent_col = false;
  }

  rowSelect(row_data, event) {
    this.store.getDisplayData().forEach(data => {
      data.row_selected = false;
    });
    row_data.row_selected = true;
    this.rowselect.emit({data: row_data, event: event});
  }

}
