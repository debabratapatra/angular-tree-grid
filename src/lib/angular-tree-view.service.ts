import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AngularTreeViewService {

  constructor() { }

  processData(data, processed_data, expand_tracker, configs) {
    // let top = data.reduce((a, b) => a.parent < b.parent ? a : b);

    const top = 0;

    data.map(rec => {
      rec.pathx = [];
      rec.leaf = false;
    });

    const children = this.findChildren(data, top, configs);

    this.orderData(data, processed_data, configs, children, []);

    processed_data.map(rec => {
      rec.pathx = rec.pathx.join('.');
      expand_tracker[rec.pathx] = false;
    });
  }

  findChildren(data, id, configs) {
    return data.filter(rec => rec[configs.parent_id] === id);
  }

  orderData(data, processed_data, configs, parents, paths) {
    parents.forEach(parent => {
      const children = this.findChildren(data, parent[configs.id], configs);

      if (children.length === 0) {
        parent.leaf = true;
        parent.pathx = [...paths];
        processed_data.push(parent);
      } else {
        parent.pathx = [...paths];
        processed_data.push(parent);

        const newPaths = [...paths, parent[configs.id]];
        this.orderData(data, processed_data, configs, children, newPaths);
      }

    });
  }
}
