import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Configs } from '../../models/Configs.model';
import { Column } from '../../models/Column.model';
import { AngularTreeGridService } from '../../angular-tree-grid.service';

@Component({
  selector: '[db-tree-body]',
  templateUrl: './tree-body.component.html',
  styleUrls: ['./tree-body.component.scss']
})
export class TreeBodyComponent implements OnInit {
  parents: Object[];

  @Input()
  data: any[];

  @Input()
  configs: Configs;

  @Input()
  processed_data: any[];

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

  constructor(private angularTreeGridService: AngularTreeGridService) { }

  ngOnInit() {
    this.parents = this.data.map(
      element => {
        return {
          'id': element[this.configs.id_field],
          'value': element[this.configs.parent_display_field]
        };
      }
    );
  }

  refreshData(element) {
    // If edit parent is not tru then don't refresh.
    if (!this.configs.actions.edit_parent) {
      return;
    }
    element[this.configs.parent_id_field] = parseInt(element[this.configs.parent_id_field], 10);
      this.processed_data = [];
      this.expand_tracker = {};
      this.edit_tracker = {};
      this.angularTreeGridService.processData(
        this.data,
        this.processed_data,
        this.expand_tracker,
        this.configs,
        this.edit_tracker,
        this.internal_configs
      );
  }

  onRowExpand(event) {
    const row_data = event.data;
    if (this.expand_tracker[row_data.pathx]) {
      this.collapse.emit(event);
    } else {
      this.expand.emit(event);
    }
    this.expand_tracker[row_data.pathx] = !this.expand_tracker[row_data.pathx];
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
        this.refreshData(element);
      }).catch((err) => {});
    } else {
      this.edit_tracker[element['idx']] = false;
      this.refreshData(element);
      this.rowsave.emit(element);
    }
  }

  cancelEdit(index) {
    this.edit_tracker[index] = false;
    this.internal_configs.show_parent_col = false;
  }

}
