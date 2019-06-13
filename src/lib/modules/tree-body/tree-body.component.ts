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

  @Input()
  rowdeselect: EventEmitter<any>;

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

    if (!this.configs.load_children_on_expand) {
      this.expand_tracker[row_data.pathx] = true;
      this.expand.emit(event);
    } else {
      const promise = new Promise((resolve, reject) => {
        this.expand.emit({
          data: row_data,
          resolve: resolve
        });
      });

      this.expand_tracker[row_data.pathx] = true;
      this.store.remove_children(row_data);
      row_data.is_loading = true;

      // Add Child rows to the table.
      promise.then((child_rows: any) => {
        row_data.is_loading = false;
        this.store.remove_children(row_data);
        if (child_rows) {
          child_rows.map(child => {
            child.leaf = true;
            child.levelx = row_data.levelx + 1;
            child.pathx = row_data.pathx + '.' + child[this.configs.id_field];
            child.parent_pathx = row_data.pathx;
            child[this.configs.parent_id_field] = row_data[this.configs.id_field];
          });

          this.store.add_children(row_data, child_rows);
        }
      }).catch((err) => {});
    }
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
        this.checkAndRefreshData(element);
      }).catch((err) => {});
    } else {
      this.checkAndRefreshData(element);
      this.rowsave.emit(element);
    }
  }

  checkAndRefreshData(element) {
    this.edit_tracker[element[this.configs.id_field]] = false;
    this.internal_configs.show_parent_col = false;

    // Only refresh if Parent has been changed.
    if (this.internal_configs.current_edited_row[this.configs.parent_id_field]
      !== element[this.configs.parent_id_field]) {
        this.refreshData(element);
    }
  }

  addRow(element) {
    this.refreshData(element);
    this.rowadd.emit(element);
  }

  cancelEdit(row_data) {
    const index = row_data[this.configs.id_field];

    // Cancel all changes ie copy from back up.
    Object.assign(row_data, this.internal_configs.current_edited_row);

    this.edit_tracker[index] = false;
    this.internal_configs.show_parent_col = false;
  }

  selectRow(row_data, event) {

    // Don't run if Multi select is enabled.
    if (this.configs.multi_select) {
      return;
    }

    this.store.getDisplayData().forEach(data => {
      data.row_selected = false;
    });
    row_data.row_selected = true;
    this.rowselect.emit({data: row_data, event: event});
  }

  selectRowOnCheck(row_data, event) {
    if (event.target.checked) {
      row_data.row_selected = true;
      this.rowselect.emit({data: row_data, event: event});
    } else {
      row_data.row_selected = false;
      this.rowdeselect.emit({data: row_data, event: event});
    }

    this.setSelectAllConfig();
  }

  /**
   * Set Select All config on Select change.
   *
   */
  setSelectAllConfig() {
    let select_all = true;

    this.store.getDisplayData().forEach(data => {
      if (!data.row_selected) {
        select_all = false;
      }
    });

    this.internal_configs.all_selected = select_all;

  }

}
