import { Component, OnChanges, Input } from '@angular/core';
import { Configs } from './models/Configs.model';
import { AngularTreeViewService } from './angular-tree-view.service';

@Component({
  selector: 'db-angular-tree-view',
  templateUrl: 'angular-tree-view.component.html',
  styles: []
})
export class AngularTreeViewComponent implements OnChanges {
  processedData: any[] = [];
  expandTracker: Object = {};

  @Input()
  data: any[];

  @Input()
  configs: Configs;

  constructor(private angularTreeViewService: AngularTreeViewService) { }

  ngOnChanges() {
    this.angularTreeViewService.processData(this.data, this.processedData, this.expandTracker, this.configs);
  }



}
