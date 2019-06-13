import { AngularTreeGridService } from '../angular-tree-grid.service';
import { Configs } from '../models/Configs.model';

export class Store {
    processed_data: any[];
    raw_data: any[];
    display_data: any[];
    configs: Configs;

    constructor(private angularTreeGridService: AngularTreeGridService) {}

    getRawData() {
        return this.raw_data;
    }

    setRawData(raw_data) {
        this.raw_data = raw_data;
    }

    getProcessedData(processed_data) {
        return this.processed_data;
    }

    setProcessedData(processed_data) {
        this.processed_data = processed_data;
        this.setDisplayData([...processed_data]);
    }

    getDisplayData() {
        return this.display_data;
    }

    setDisplayData(display_data) {
        this.display_data = display_data;
        this.angularTreeGridService.updateDisplayDataObservable(this.display_data);
    }

    /**
     * Show Blank row for subgrid.
     *
     * @param  row_data Row Data
     * @returns blank_row
     */
    showBlankRow(row_data) {
        const row_index = this.display_data.map(row => row[this.configs.id_field]).
                        indexOf(row_data[this.configs.id_field]);

        let blank_row = this.display_data[row_index + 1];
        if (!blank_row || blank_row.parent_pathx !== row_data[this.configs.id_field]) {
            blank_row = {
                leaf: true,
                parent_pathx: row_data[this.configs.id_field]
            };
            blank_row[this.configs.id_field] = -1;
            this.display_data.splice(row_index + 1, 0, blank_row);
        }

        return blank_row;
    }

    add_children_to_processed_data(row_data, children) {
        const row_index = this.display_data.map(row => row[this.configs.id_field]).
                        indexOf(row_data[this.configs.id_field]);
        const top_rows = this.processed_data.slice(0, row_index + 1);
        const bottom_rows = this.processed_data.slice(row_index + 1);
        this.processed_data = top_rows.concat(children).concat(bottom_rows);
        this.setDisplayData([...this.processed_data]);
        this.angularTreeGridService.updateDisplayDataObservable(this.display_data);
    }

    filterBy(fields, search_values) {
        this.display_data = this.processed_data.filter((record) => {
            let found = true;
            for (let index = 0; index < fields.length; index++) {
                let field_value = record[fields[index]];
                let search_value = search_values[index];

                // If blank then continue.
                if (!search_value) {
                    continue;
                }

                if (typeof(field_value) === 'number') {
                    if (field_value !== parseInt(search_value, 10)) {
                        found = false;
                    }
                } else {
                    const column = this.configs.columns[index];
                    if (!column.case_sensitive_filter) {
                        field_value = field_value.toLowerCase();
                        search_value = search_value.toLowerCase();
                    }
                    if (field_value.indexOf(search_value) === -1) {
                        found = false;
                    }
                }
            }
            return found;
        });
        this.angularTreeGridService.updateDisplayDataObservable(this.display_data);
    }

    selectAll() {
        this.display_data.forEach(data => {
            data.row_selected = true;
        });
    }

    deSelectAll() {
        this.display_data.forEach(data => {
            data.row_selected = false;
        });
    }

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

    processData(data, expand_tracker, configs: Configs, edit_tracker, internal_configs) {
        const top_parents = this.findTopParentNode(data, configs);
        const processed_data = [];
        internal_configs.top_parents = top_parents;

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

            // For Subgrid feature, expect all rows are expandable.
            if (configs.subgrid) {
                rec.leaf = false;
            }
        });

        // Expand root.
        expand_tracker[''] = true;
        this.setProcessedData(processed_data);
        this.setRawData(data);
        this.configs = configs;
        console.log(processed_data);
        console.log(expand_tracker);
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
