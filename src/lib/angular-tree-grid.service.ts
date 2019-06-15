import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularTreeGridService {

  private display_data_observable = new Subject<any[]>();
  display_data_observable$ = this.display_data_observable.asObservable();

  constructor() { }

  updateDisplayDataObservable(display_data: any[]) {
    this.display_data_observable.next(display_data);
  }

  expandAll(expand_tracker) {
    for (const key in expand_tracker) {
      if (expand_tracker.hasOwnProperty(key)) {
        expand_tracker[key] = true;
      }
    }
  }

  collapseAll(expand_tracker) {
    for (const key in expand_tracker) {
      if (expand_tracker.hasOwnProperty(key)) {
        expand_tracker[key] = false;
      }
    }
    expand_tracker[''] = true;
  }

  emitExpandRowEvent(expand_tracker, expand, store, row_data, configs) {
    const promise = new Promise((resolve, reject) => {
      expand.emit({
        data: row_data,
        resolve: resolve
      });
    });

    expand_tracker[row_data.pathx] = true;
    store.remove_children(row_data);
    row_data.is_loading = true;

    // Add Child rows to the table.
    promise.then((child_rows: any) => {
      row_data.is_loading = false;
      store.remove_children(row_data);
      if (child_rows) {
        child_rows.map(child => {
          child.leaf = true;
          child.levelx = row_data.levelx + 1;
          child.pathx = row_data.pathx + '.' + child[configs.id_field];
          child.parent_pathx = row_data.pathx;
          child[configs.parent_id_field] = row_data[configs.id_field];
        });

        store.add_children(row_data, child_rows);
      }
    }).catch((err) => {});
  }
}
