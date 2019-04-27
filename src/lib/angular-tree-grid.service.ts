import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AngularTreeGridService {

  constructor() { }

  findTopParentNode(data, configs) {
    const ids = data.map(element => element[configs.id_field]);
    let top_parents = [];

    // Find parents ie if parent_id is not present in ids.
    data.forEach(element => {
      if (!ids.includes(element[configs.parent_id_field])) {
        top_parents.push(element[configs.parent_id_field]);
      }
    });

    // Remove duplicates
    top_parents = top_parents.filter(function(item, pos, self) {
      return self.indexOf(item) === pos;
    });

    return top_parents;
  }

  processData(data, processed_data, expand_tracker, configs, edit_tracker) {
    const top_parents = this.findTopParentNode(data, configs);

    data.map(rec => {
      rec.pathx = [];
      rec.leaf = false;
    });

    top_parents.forEach(top_parent => {
      const children = this.findChildren(data, top_parent, configs);

      this.orderData(data, processed_data, configs, children, [], 0);
    });

    processed_data.map(rec => {
      const parent_pathx = rec.parent_pathx;
      rec.parent_pathx = parent_pathx.join('.');
      parent_pathx.push(rec[configs.id_field]);

      // Add current id to create current path.
      rec.pathx = parent_pathx.join('.');
      expand_tracker[rec.pathx] = false;
      edit_tracker[rec[configs.id_field]] = false;
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
