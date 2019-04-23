import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AngularTreeGridService {

  constructor() { }

  processData(data, processed_data, expand_tracker, configs) {
    // let top = data.reduce((a, b) => a.parent < b.parent ? a : b);

    const top = 0;

    data.map(rec => {
      rec.pathx = [];
      rec.leaf = false;
    });

    const children = this.findChildren(data, top, configs);

    this.orderData(data, processed_data, configs, children, [], 0);

    processed_data.map(rec => {
      const parent_pathx = rec.parent_pathx;
      rec.parent_pathx = parent_pathx.join('.');
      parent_pathx.push(rec[configs.id_field]);

      // Add current id to create current path.
      rec.pathx = parent_pathx.join('.');
      expand_tracker[rec.pathx] = false;
    });

    // Expand root.
    expand_tracker[''] = true;
  }

  findChildren(data, id, configs) {
    return data.filter(rec => rec[configs.parent_id_field] === id);
  }

  orderData(data, processed_data, configs, parents, paths, levelx) {
    parents.forEach(parent => {
      const children = this.findChildren(data, parent[configs.id_field], configs);

      if (children.length === 0) {
        parent.leaf = true;
        parent.levelx = levelx;
        parent.parent_pathx = [...paths];
        processed_data.push(parent);
      } else {
        parent.parent_pathx = [...paths];
        parent.levelx = levelx;
        processed_data.push(parent);

        const newPaths = [...paths, parent[configs.id_field]];
        this.orderData(data, processed_data, configs, children, newPaths, levelx + 1);
      }

    });
  }
}
