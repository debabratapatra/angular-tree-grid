import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Store } from '../../../../store/store';
import { Configs } from '../../../../models/Configs.model';

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
  expand_tracker: Object;

  @Input()
  edit_tracker: Object;

  @Input()
  internal_configs: any;

  @Input()
  row_data: any;

  @Input()
  cellclick: EventEmitter<any>;


  constructor() { }

  ngOnInit() {
  }

}
