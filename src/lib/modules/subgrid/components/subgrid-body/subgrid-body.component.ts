import { Component, OnInit, Input } from '@angular/core';
import { Configs } from '../../../../models/Configs.model';

@Component({
  selector: '[db-subgrid-body]',
  templateUrl: './subgrid-body.component.html',
  styleUrls: ['./subgrid-body.component.scss']
})
export class SubgridBodyComponent implements OnInit {
  @Input()
  configs: Configs;

  @Input()
  expand_tracker: Object;

  @Input()
  row_data: Object;

  constructor() { }

  ngOnInit() {
  }

}
