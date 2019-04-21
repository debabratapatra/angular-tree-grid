import { Component, OnInit, Input } from '@angular/core';
import { Configs } from '../../models/Configs.model';

@Component({
  selector: '[db-tree-body]',
  templateUrl: './tree-body.component.html',
  styleUrls: ['./tree-body.component.scss']
})
export class TreeBodyComponent implements OnInit {
  @Input()
  data: any[];

  @Input()
  configs: Configs;

  @Input()
  processedData: any[];

  @Input()
  expandTracker: Object;

  constructor() { }

  ngOnInit() {
  }

}
