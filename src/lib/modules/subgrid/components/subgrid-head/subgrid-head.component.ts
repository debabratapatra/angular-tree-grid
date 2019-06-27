import { Component, OnInit, Input } from '@angular/core';
import { Configs } from '../../../../models/Configs.model';

@Component({
  selector: '[db-subgrid-head]',
  templateUrl: './subgrid-head.component.html',
  styleUrls: ['./subgrid-head.component.scss']
})
export class SubgridHeadComponent implements OnInit {
  @Input()
  configs: Configs;

  constructor() { }

  ngOnInit() {
  }

}
