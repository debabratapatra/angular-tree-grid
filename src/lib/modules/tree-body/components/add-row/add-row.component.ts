import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Column } from '../../../../models/Column.model';
import { Configs } from '../../../../models/Configs.model';

@Component({
  selector: '[db-add-row]',
  templateUrl: './add-row.component.html',
  styleUrls: ['./add-row.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRowComponent implements OnInit {
  row_data: Object = {};
  parents: Object[] = [];
  show_add_row: boolean;

  @Input()
  data: any;

  @Input()
  processed_data: any;

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
    this.columns.forEach(column => {
      this.row_data[column.name] = '';
    });
    this.parents = this.data.map(
      element => {
        return {
          'id': element[this.configs.id_field],
          'value': element[this.configs.parent_display_field]
        };
      }
    );
  }

  saveAddRecord(e) {
    const index = this.processed_data.length;

    this.data.push(this.row_data);
    this.internal_configs.show_add_row = false;

    this.rowadd.emit(this.row_data);
  }

  cancelAddEdit() {
    this.internal_configs.show_add_row = false;
  }

}
