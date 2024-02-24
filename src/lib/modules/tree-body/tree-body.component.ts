import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Configs } from "../../models/Configs.model";
import { Column } from "../../models/Column.model";
import { AngularTreeGridService } from "../../angular-tree-grid.service";
import { Store } from "../../store/store";

@Component({
  selector: "[db-tree-body]",
  templateUrl: "./tree-body.component.html",
  styleUrls: ["./tree-body.component.scss"],
})
export class TreeBodyComponent implements OnInit {
  parents: any[] = [];
  raw_data: any[] = [];
  display_data: any[] = [];

  @Input()
  store!: Store;

  @Input()
  configs!: Configs;

  @Input()
  expand_tracker: any;

  @Input()
  edit_tracker: any;

  @Input()
  internal_configs: any;

  @Input()
  columns!: Column[];

  @Input()
  cellclick!: EventEmitter<any>;

  @Input()
  expand!: EventEmitter<any>;

  @Input()
  collapse!: EventEmitter<any>;

  @Input()
  rowdelete!: EventEmitter<any>;

  @Input()
  rowsave!: EventEmitter<any>;

  @Input()
  rowadd!: EventEmitter<any>;

  @Input()
  rowselect!: EventEmitter<any>;

  @Input()
  rowdeselect!: EventEmitter<any>;

  constructor(private angularTreeGridService: AngularTreeGridService) {}

  ngOnInit() {
    this.display_data = this.store.getDisplayData();
    this.angularTreeGridService.display_data_observable$.subscribe((store) => {
      this.display_data = this.store.getDisplayData();
      this.setParents();
    });
    this.setParents();
  }

  setParents() {
    this.parents = this.store.raw_data.map((element) => {
      return {
        id: element[this.configs.id_field],
        value: element[this.configs.parent_display_field],
      };
    });
  }

  refreshData(element: any) {
    // If edit parent is not true then don't refresh.
    if (!this.configs.actions?.edit_parent) {
      return;
    }
    element[this.configs.parent_id_field] = parseInt(
      element[this.configs.parent_id_field],
      10
    );
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

  onRowExpand(event: any) {
    const row_data = event.data;

    if (!this.configs.load_children_on_expand) {
      this.expand_tracker[row_data.pathx] = true;
      this.expand.emit(event);
    } else {
      this.angularTreeGridService.emitExpandRowEvent(
        this.expand_tracker,
        this.expand,
        this.store,
        row_data,
        this.configs
      );
    }
  }

  onRowCollapse(event: any) {
    const row_data = event.data;
    this.expand_tracker[row_data.pathx] = false;

    // Collapse all of its children.
    const keys = Object.keys(this.expand_tracker);
    keys.forEach((key) => {
      if (key.indexOf(row_data.pathx) !== -1) {
        this.expand_tracker[key] = 0;
      }
    });

    this.collapse.emit(event);
  }

  saveRecord($event: any) {
    const element = $event.data;

    if (this.configs.actions?.resolve_edit) {
      const promise = new Promise((resolve, reject) => {
        this.rowsave.emit({
          data: element,
          resolve: resolve,
        });
      });

      promise
        .then(() => {
          this.checkAndRefreshData(element);
        })
        .catch((err) => {});
    } else {
      this.checkAndRefreshData(element);
      this.rowsave.emit(element);
    }
  }

  checkAndRefreshData(element: any) {
    this.edit_tracker[element[this.configs.id_field]] = false;
    this.internal_configs.show_parent_col = false;

    // Only refresh if Parent has been changed.
    if (
      this.internal_configs.current_edited_row[this.configs.parent_id_field] !==
      element[this.configs.parent_id_field]
    ) {
      this.refreshData(element);
    }
  }

  addRow(element: any) {
    if (this.configs.actions?.resolve_add) {
      const promise = new Promise((resolve, reject) => {
        this.rowadd.emit({
          data: element,
          resolve: resolve,
        });
      });

      promise
        .then(() => {
          this.internal_configs.show_add_row = false;
          this.refreshData(element);
        })
        .catch((err) => {});
    } else {
      this.refreshData(element);
      this.internal_configs.show_add_row = false;
      this.rowadd.emit(element);
    }
  }

  cancelEdit(row_data: any) {
    const index = row_data[this.configs.id_field];

    // Cancel all changes ie copy from back up.
    Object.assign(row_data, this.internal_configs.current_edited_row);

    this.edit_tracker[index] = false;
    this.internal_configs.show_parent_col = false;
  }

  selectRow(row_data: any, event: any) {
    // Don't run if Multi select is enabled.
    if (this.configs.multi_select) {
      return;
    }

    this.store.getDisplayData().forEach((data) => {
      data.row_selected = false;
    });
    row_data.row_selected = true;
    this.rowselect.emit({ data: row_data, event: event });
  }

  selectRowOnCheck(row_data: any, event: any) {
    if (event.target.checked) {
      row_data.row_selected = true;
      this.rowselect.emit({ data: row_data, event: event });
    } else {
      row_data.row_selected = false;
      this.rowdeselect.emit({ data: row_data, event: event });
    }

    this.setSelectAllConfig();
  }

  /**
   * Set Select All config on Select change.
   *
   */
  setSelectAllConfig() {
    let select_all = true;

    this.store.getDisplayData().forEach((data) => {
      if (!data.row_selected) {
        select_all = false;
      }
    });

    this.internal_configs.all_selected = select_all;
  }
}
