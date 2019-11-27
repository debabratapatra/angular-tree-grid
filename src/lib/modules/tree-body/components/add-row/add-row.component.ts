import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Column } from '../../../../models/Column.model';
import { Configs } from '../../../../models/Configs.model';
import { Store } from '../../../../store/store';

@Component({
  selector: '[db-add-row]',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRowComponent implements OnInit {
  raw_data: any[];
  row_data: any = {};
  parents: any[] = [];
  show_add_row: boolean;

  @Input()
  store: Store;

  @Input()
  columns: Column[];

  @Input()
  configs: Configs;

  @Input()
  internal_configs: any;

  @Output() rowadd: EventEmitter<any> = new EventEmitter();
  @Output() canceledit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.raw_data = this.store.getRawData();
    this.columns.forEach(column => {
      this.row_data[column.name] = '';
    });
    this.parents = this.raw_data.map(
      element => {
        return {
          'id': element[this.configs.id_field],
          'value': element[this.configs.parent_display_field]
        };
      }
    );
  }

  saveAddRecord(e) {
    this.raw_data.push(this.row_data);
    this.rowadd.emit(this.row_data);
  }

  cancelAddEdit() {
    this.internal_configs.show_add_row = false;
  }

}
