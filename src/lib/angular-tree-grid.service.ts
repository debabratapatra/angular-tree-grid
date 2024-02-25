import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Configs } from "./models/Configs.model";
import { Store } from "./store/store";

@Injectable({
  providedIn: "root",
})
export class AngularTreeGridService {
  private display_data_observable = new Subject<any[]>();
  display_data_observable$ = this.display_data_observable.asObservable();

  constructor() {}

  updateDisplayDataObservable(display_data: any) {
    this.display_data_observable.next(display_data);
  }

  findRowIndex(display_data: any, configs: Configs, row_id: number) {
    return display_data
      .map((row: any) => row[configs.id_field])
      .indexOf(row_id);
  }

  selectAll(display_data: any) {
    display_data.forEach((data: any) => {
      data.row_selected = true;
    });
  }

  deSelectAll(display_data: any) {
    display_data.forEach((data: any) => {
      data.row_selected = false;
    });
  }

  expandAll(expand_tracker: any) {
    for (const key in expand_tracker) {
      if (expand_tracker.hasOwnProperty(key)) {
        expand_tracker[key] = true;
      }
    }
  }

  collapseAll(expand_tracker: any) {
    for (const key in expand_tracker) {
      if (expand_tracker.hasOwnProperty(key)) {
        expand_tracker[key] = false;
      }
    }
    expand_tracker[""] = true;
  }

  expandRow(
    row_id: number,
    expand_tracker: any,
    expand_event: any,
    suppress_event: any,
    configs: Configs,
    display_data: any,
    store: Store
  ) {
    if (configs.subgrid) {
      this.expandSubgridRow(
        row_id,
        expand_tracker,
        expand_event,
        suppress_event,
        configs,
        display_data,
        store
      );
      return;
    }
    const row_index = this.findRowIndex(display_data, configs, row_id);

    const row_data = display_data[row_index];
    const pathx = row_data.pathx;
    const parts = pathx.split(".");
    expand_tracker[row_data.pathx] = true;
    let expanded_count = 1;

    for (let index = 0; index < display_data.length; index++) {
      const record = display_data[index];

      // Stop when all rows are expanded.
      if (expanded_count >= parts.length) {
        return;
      }

      // Join paths as we expand.
      const key = parts.slice(0, expanded_count).join(".");

      // We don't want to expand it's children here.
      if (record.pathx.indexOf(key) !== -1) {
        expanded_count += 1;
        expand_tracker[record.pathx] = true;

        if (!suppress_event) {
          if (configs.load_children_on_expand) {
            this.emitExpandRowEvent(
              expand_tracker,
              expand_event,
              store,
              row_data,
              configs
            );
          } else {
            expand_event.emit({ event: null, data: row_data });
          }
        }
      }
    }
  }

  collapseRow(
    row_id: number,
    expand_tracker: any,
    collapse_event: any,
    suppress_event: any,
    configs: Configs,
    display_data: any
  ) {
    const row_index = this.findRowIndex(display_data, configs, row_id);

    const row_data = display_data[row_index];
    const pathx = row_data.pathx;
    expand_tracker[pathx] = false;

    // Collapse children rows as well
    display_data.forEach((record: any) => {
      if (record.pathx.indexOf(pathx) !== -1) {
        expand_tracker[record.pathx] = 0;
        if (!suppress_event) {
          collapse_event.emit({ event: null, data: row_data });
        }
      }
    });
  }

  emitExpandRowEvent(
    expand_tracker: any,
    expand: any,
    store: Store,
    row_data: any,
    configs: Configs
  ) {
    const promise = new Promise((resolve, reject) => {
      expand.emit({
        data: row_data,
        resolve: resolve,
      });
    });

    expand_tracker[row_data.pathx] = true;
    store.remove_children(row_data);
    row_data.is_loading = true;

    // Add Child rows to the table.
    promise
      .then((child_rows: any) => {
        row_data.is_loading = false;
        store.remove_children(row_data);
        if (child_rows) {
          child_rows.map((child: any) => {
            child.leaf = true;
            child.levelx = row_data.levelx + 1;
            child.pathx = row_data.pathx + "." + child[configs.id_field];
            child.parent_pathx = row_data.pathx;
            child[configs.parent_id_field] = row_data[configs.id_field];
          });

          store.add_children(row_data, child_rows);
        }
      })
      .catch((err) => {});
  }

  disableRowSelection(display_data: any, configs: Configs, row_id: number) {
    const row_index = this.findRowIndex(display_data, configs, row_id);
    display_data[row_index].selection_disabled = true;
  }

  enableRowSelection(display_data: any, configs: Configs, row_id: number) {
    const row_index = this.findRowIndex(display_data, configs, row_id);
    display_data[row_index].selection_disabled = false;
  }

  disableRowExpand(display_data: any, configs: Configs, row_id: number) {
    const row_index = this.findRowIndex(display_data, configs, row_id);
    display_data[row_index].expand_disabled = true;
  }

  enableRowExpand(display_data: any, configs: Configs, row_id: number) {
    const row_index = this.findRowIndex(display_data, configs, row_id);
    display_data[row_index].expand_disabled = false;
  }

  expandSubgridRow(
    row_id: number,
    expand_tracker: any,
    expand_event: EventEmitter<any>,
    suppress_event: any,
    configs: Configs,
    display_data: any,
    store: Store
  ) {
    const row_index = this.findRowIndex(display_data, configs, row_id);
    const row_data = display_data[row_index];
    expand_tracker[row_data.pathx] = true;

    if (!suppress_event) {
      this.emitSubgridExpandRowEvent(
        expand_tracker,
        expand_event,
        store,
        row_data
      );
    }
  }

  emitSubgridExpandRowEvent(
    expand_tracker: any,
    expand: EventEmitter<any>,
    store: Store,
    row_data: any
  ) {
    const promise = new Promise((resolve, reject) => {
      expand.emit({
        data: row_data,
        resolve: resolve,
      });
    });

    expand_tracker[row_data.pathx] = true;
    const blank_row: any = store.showBlankRow(row_data);
    blank_row.loading_children = true;

    // Add Child rows to the table.
    promise
      .then((child_rows: any) => {
        blank_row.loading_children = false;

        if (child_rows) {
          child_rows.map((child: any) => {
            child.leaf = true;
          });
          blank_row.children = child_rows;
        } else {
          // Persist old children. If didn't exist then assign blank array.
          if (!blank_row.children) {
            blank_row.children = [];
          }
        }
      })
      .catch((err) => {});
  }
}
