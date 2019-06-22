import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Configs } from '../../models/Configs.model';
import { Column } from '../../models/Column.model';
import { Store } from '../../store/store';
import { AngularTreeGridService } from '../../angular-tree-grid.service';

@Component({
  selector: '[db-tree-head]',
  templateUrl: './tree-head.component.html',
  styleUrls: ['./tree-head.component.scss']
})
export class TreeHeadComponent implements OnInit {

  @Input()
  store: Store;

  @Input()
  configs: Configs;

  @Input()
  expand_tracker: Object;

  @Input()
  edit_tracker: any;

  @Input()
  internal_configs: any;

  @Input()
  columns: Column[];

  @Input()
  rowselectall: EventEmitter<any>;

  @Input()
  rowdeselectall: EventEmitter<any>;

  constructor(private angularTreeGridService: AngularTreeGridService) { }

  ngOnInit() {}

  addRow() {
    this.internal_configs.show_add_row = true;
  }

  selectAll(e) {
    if (e.target.checked) {
      this.angularTreeGridService.selectAll(this.store.getDisplayData());
      this.rowselectall.emit(this.store.getDisplayData());
    } else {
      this.angularTreeGridService.deSelectAll(this.store.getDisplayData());
      this.rowdeselectall.emit(e);
    }
  }

}
