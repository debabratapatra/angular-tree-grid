import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Store } from '../../store/store';
import { Configs } from '../../models/Configs.model';

@Component({
  selector: '[db-subgrid]',
  templateUrl: './subgrid.component.html',
  styleUrls: ['./subgrid.component.scss']
})
export class SubgridComponent implements OnInit {

  @Input()
  store: Store;

  @Input()
  configs: Configs;

  @Input()
  expand_tracker: any;

  @Input()
  edit_tracker: any;

  @Input()
  internal_configs: any;

  @Input()
  row_data: any;

  @Input()
  cellclick: EventEmitter<any>;

  @Input()
  expand: EventEmitter<any>;

  @Input()
  rowselect: EventEmitter<any>;

  @Input()
  rowdeselect: EventEmitter<any>;

  @Input()
  rowsave: EventEmitter<any>;

  @Input()
  rowdelete: EventEmitter<any>;

  constructor() { }

  ngOnInit() {}

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

  cancelEdit(row_data) {
    const index = row_data[this.configs.id_field];

    // Cancel all changes ie copy from back up.
    Object.assign(row_data, this.internal_configs.current_edited_row);

    this.edit_tracker[index] = false;
    this.internal_configs.show_parent_col = false;
  }

  onRowExpand(event) {
    const row_data = event.data;

    const promise = new Promise((resolve, reject) => {
      this.expand.emit({
        data: row_data,
        resolve: resolve
      });
    });

    this.expand_tracker[row_data.pathx] = true;
    const blank_row: any = this.store.showBlankRow(row_data);
    blank_row.loading_children = true;

    // Add Child rows to the table.
    promise.then((child_rows: any) => {
      blank_row.loading_children = false;

      if (child_rows) {
        child_rows.map(child => {
          child.leaf = true;
        });
        blank_row.children = child_rows;
      } else {

        // Persist old children. If didn't exist then assign blank array.
        if (!blank_row.children) {
          blank_row.children = [];
        }
      }

    }).catch((err) => {});
  }

  onRowCollapse(event) {
    const row_data = event.data;
    this.expand_tracker[row_data.pathx] = false;
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
