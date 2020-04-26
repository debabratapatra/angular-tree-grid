import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Configs } from '../../../../models/Configs.model';
import { Store } from '../../../../store/store';

@Component({
  selector: '[db-tree-cell-actions]',
  templateUrl: './tree-cell-actions.component.html',
  styleUrls: ['./tree-cell-actions.component.scss']
})
export class TreeCellActionsComponent implements OnInit {
  display_data: any;

  @Input()
  store: Store;

  @Input()
  edit_tracker: any;

  @Input()
  internal_configs: any;

  @Input()
  configs: Configs;

  @Input()
  rowdelete: EventEmitter<any>;

  @Input()
  row_data: any;

  @Output() editcomplete: EventEmitter<any> = new EventEmitter();
  @Output() canceledit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.display_data = this.store.getDisplayData();
  }

  enableEdit(index, row_data) {
    this.edit_tracker[index] = true;

    // Only if edit_parent is true.
    if (this.configs.actions.edit_parent) {
      this.internal_configs.show_parent_col = true;
      this.internal_configs.current_edited_row = {...row_data};
    }
  }

  findRecordIndex(pathx: number) {
    for (const index in this.store.processed_data) {
      if (this.store.processed_data[index].pathx === pathx) {
        return Number(index);
      }
    }
  }

  deleteRecord(rec) {
    const index: number = this.findRecordIndex(rec.pathx);
    if (this.configs.actions.resolve_delete) {
      const promise = new Promise((resolve, reject) => {
        this.rowdelete.emit({
          data: rec,
          resolve: resolve
        });
      });

      promise.then(() => {
        this.store.processed_data.splice(index, 1);
        this.store.refreshDisplayData();
      }).catch((err) => {});
    } else {
      this.store.processed_data.splice(index, 1);
      this.store.refreshDisplayData();
      this.rowdelete.emit(rec);
    }
  }

  saveRecord($event) {
    this.editcomplete.emit({event: $event, data: this.row_data});
  }

}
