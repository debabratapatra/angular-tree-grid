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

  enableEdit(index) {
    this.edit_tracker[index] = true;

    // Only if edit_parent is true.
    if (this.configs.actions.edit_parent) {
      this.internal_configs.show_parent_col = true;
    }
  }

  findRecordIndex(idx: number) {
    for (const index in this.display_data) {
      if (this.display_data[index].idx === idx) {
        return index;
      }
    }
  }

  deleteRecord(rec) {
    if (this.configs.actions.resolve_delete) {
      const promise = new Promise((resolve, reject) => {
        this.rowdelete.emit({
          data: rec,
          resolve: resolve
        });
      });

      promise.then(() => {
        this.display_data.splice(this.findRecordIndex(rec.idx), 1);
      }).catch((err) => {});
    } else {
      this.display_data.splice(this.findRecordIndex(rec.idx), 1);
      this.rowdelete.emit(rec);
    }
  }

  saveRecord($event) {
    this.editcomplete.emit({event: $event, data: this.row_data});
  }

}
