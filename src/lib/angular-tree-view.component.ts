import { Component, OnInit, Input } from '@angular/core';
import { Configs } from './models/Configs.model';

@Component({
  selector: 'db-angular-tree-view',
  templateUrl: 'angular-tree-view.component.html',
  styles: []
})
export class AngularTreeViewComponent implements OnInit {
  processedData: any[] = [];
  expandTracker: Object = {};

  @Input()
  data: any[];

  @Input()
  configs: Configs;

  constructor() { }

  ngOnInit() {
    this.processData();
  }

  processData() {
    let top = this.data.reduce((a, b) => a.parent < b.parent ? a : b);

    top = 0;

    this.data.map(rec => {
      rec.pathx = [];
      rec.leaf = false;
    });

    const children = this.findChildren(top);

    this.orderData(children, []);

    this.processedData.map(rec => {
      rec.pathx = rec.pathx.join('.');
      this.expandTracker[rec.pathx] = false;
    });

    console.log(this.processedData);
    console.log(this.expandTracker);
  }

  findChildren(id) {
    return this.data.filter(rec => rec.parent === id);
  }

  orderData(parents, paths) {
    parents.forEach(parent => {
      const children = this.findChildren(parent.id);

      if (children.length === 0) {
        parent.leaf = true;
        parent.pathx = [...paths];
        this.processedData.push(parent);
      } else {
        parent.pathx = [...paths];
        this.processedData.push(parent);

        const newPaths = [...paths, parent.id];
        this.orderData(children, newPaths);
      }

    });
  }

}
