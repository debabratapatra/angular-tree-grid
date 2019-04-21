import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AngularTreeViewService {

  constructor() { }

  processData(data, processedData, expandTracker, configs) {
    // let top = data.reduce((a, b) => a.parent < b.parent ? a : b);

    const top = 0;

    data.map(rec => {
      rec.pathx = [];
      rec.leaf = false;
    });

    const children = this.findChildren(data, top, configs);

    this.orderData(data, processedData, configs, children, []);

    processedData.map(rec => {
      rec.pathx = rec.pathx.join('.');
      expandTracker[rec.pathx] = false;
    });
  }

  findChildren(data, id, configs) {
    return data.filter(rec => rec[configs.parent_id] === id);
  }

  orderData(data, processedData, configs, parents, paths) {
    parents.forEach(parent => {
      const children = this.findChildren(data, parent[configs.id], configs);

      if (children.length === 0) {
        parent.leaf = true;
        parent.pathx = [...paths];
        processedData.push(parent);
      } else {
        parent.pathx = [...paths];
        processedData.push(parent);

        const newPaths = [...paths, parent[configs.id];
        this.orderData(data, processedData, configs, children, newPaths);
      }

    });
  }
}
