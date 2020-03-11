# Angular Tree Component
Angular Tree Grid to show hierarchical data. Basically if data has Parent-Child relationship. It also supports sub-grid/nested-grid. If data needs to be grouped by fields then check out this <a href="https://github.com/debabratapatra/ngtreegrid" target="_blank">Package</a>.

## Demo

Click <a href="https://angular-tree-grid.stackblitz.io/" target="_blank">here</a> for demo. This readme is the documentation. Visit my <a href="https://debabratapatra.github.io" target="_blank">Website</a> to know other packages.
<div>
<img src="https://debabratapatra.github.io/resources/images/cards/angular-tree-grid.png" alt="Loading" />
</div>

## Donate :hearts:

Please consider a <a href="https://paypal.me/debpatra" target="_blank">donation</a> if it is useful to you.

## Installation

```bash
    npm i angular-tree-grid
```

## Usage

### Import
Import NgtreegridModule Module in your application module.

```javascript
  import {AngularTreeGridModule} from 'angular-tree-grid';
```

Add it to your imports array.

```javascript
    @NgModule({
      imports: [
        AngularTreeGridModule
      ]
    })
```

### Data
Data should look like below. Data should have Unique field(id) and Parent field(parent) which is foreign key of the id. Ofcourse these fields are configurable. See below.

```
  data= [
    { id: 1, name: 'Ashok', age: 60, parent: 0},
    { id: 2, name: 'Sam', age: 40, parent: 1},
    { id: 3, name: 'Sriya', age: 36, parent: 1},
    { id: 4, name: 'Prakash', age: 20, parent: 2},
    { id: 5, name: 'Sneha', age: 21, parent: 3},
    { id: 6, name: 'Pritam', age: 60, parent: 34},
    { id: 7, name: 'Roshan', age: 40, parent: 6},
    { id: 8, name: 'Suraj', age: 36, parent: 6},
    { id: 9, name: 'Swarup', age: 20, parent: 8},
    { id: 10, name: 'Aditya', age: 21, parent: 8},
  ];
```

### Configs
Below are configs that can be set

#### Grid Configurations
| Field  |Type   |Default |  Description |
|---|---|---|---|
| *id_field  | string  |  n/a | It's a mandatory field. It is the primary key.  |
|  *parent_id_field |  string | n/a  | It's a mandatory field. It is the foreign key.  |
|  *parent_display_field |  string | n/a  |  It's a mandatory field. It is the display field of the row that will be expanded. |
|  data_loading_text |  string | 'Loading...'  |  Loading place holder. This will be displayed when data is empty. |
|  filter |  boolean | false  |  It enables filter toolbar. Filter is customizable at column level. |
|  multi_select |  boolean | false  |  It enables checkbox selection. |
|  show_summary_row |  boolean | false  |  It enables summary or footer row. Use summary_renderer at the column level |
|  load_children_on_expand |  boolean | false  |  It enables dynamic children loading. It means children will be loaded on row-expand. See <a href="https://angular-tree-grid.stackblitz.io/dynamic_children">Example</a> for more information.|
|  subgrid |  boolean | false  |  It enables subgrid feature. parent_id_field is not mandatory for subgrid. Add feature is disabled when it is true. See this <a href="https://angular-tree-grid.stackblitz.io/subgrid">Example</a> for more information|
|  subgrid_config |  Object | n/a  |  Configs for subgrid. See below table for this. |
|  show_parent_on_edit |  boolean | true  |  Show Parent column On Edit. It is true by default. |
|  row_class_function |  Function | n/a  |  Callback function for row class. A custom class can be returned which will be added to the row. |
|  row_edit_function |  Function | n/a  |  Callback function for edit feature. Based on the return type(Boolean) of this function, edit can be enabled/disabled for a specific row. See <a href="https://angular-tree-grid.stackblitz.io/cond_row_edit">Example</a> for more information. |
|  row_delete_function |  Function | n/a  |  Callback function for delete feature. Based on the return type(Boolean) of this function, delete can be enabled/disabled for a specific row. See <a href="https://angular-tree-grid.stackblitz.io/cond_row_edit">Example</a> for more information. |
| actions  | Object  |  n/a | Settings for Action column. See Below  |
| css  | Object  |  n/a | Css class for icons. See Below  |
| columns  | Array  |  n/a | It is an Array. If not provided all keys of the data Array will be used as Column Headers. Please find the description below  |

##### actions
| Field  |Type   |Default |  Description |
|---|---|---|---|
| add  | boolean  |  false | It enables add feature.  |
| edit  | boolean  |  false | It enables edit feature.  |
| delete  | boolean  |  false | It enables delete feature.  |
| resolve_add  | boolean  |  false | Manually resolve add(after making call to server). It defaults to false. See <a href="https://angular-tree-grid.stackblitz.io/resolve_row_add">example</a> for more information.  |
| resolve_edit  | boolean  |  false | Manually resolve edit.  |
| resolve_delete  | boolean  |  false | Manually resolve delete feature.  |
##### css
| Field  |Type   |Default |  Description |
|---|---|---|---|
| expand_class  | string  |  plus | Icon class for Expand icon. Font Awesome class can be given.  |
| collapse_class  | string  |  minus | Icon class for Collapse icon. Font Awesome class can be given.  |
| add_class  | string  |  plus | Icon class for Add icon. Font Awesome class can be given.  |
| edit_class  | string  |  edit | Icon class for Edit icon. Font Awesome class can be given.  |
| delete_class  | string  |  delete | Icon class for Delete icon. Font Awesome class can be given.  |
| save_class  | string  |  save | Icon class for Save icon. Font Awesome class can be given.  |
| cancel_class  | string  |  cancel | Icon class for Cancel icon. Font Awesome class can be given.  |
| row_selection_class  | string  |  n/a | CSS Class for selected row.  |
| header_class  | string  |  n/a | CSS Class for header.  |
| table_class  | string  |  n/a | CSS Class for Table.  |
##### columns
| Field  |Type   |Default |  Description |
|---|---|---|---|
| name  | string  |  n/a | key of the column.  |
| header  | string  |  n/a | Header of the column that will be displayed in the table.  |
| width  | string  |  n/a | Width of the column with unit(px/rem).  |
| css_class  | string  |  n/a | Custom css class for the column.  |
| hidden  | boolean  |  false | Show/Hide column.  |
| filter  | boolean  |  true | Enable/Disable filter.  |
| filter_function  | Function  |  n/a | Custom filter function. filter must be enabled for this. See this <a href="https://debabratapatra.github.io/pages/angular-tree-grid/demo/#/filter_column">Example</a> for more information. |
| case_sensitive_filter  | boolean  |  false | Case Sensitive/Insensitive Filter.  |
| editable  | boolean  |  false | To make a specific column editable. By default columns are not editable. edit option needs to be true at **grid** level.  |
| renderer  | Function  |  n/a | It is a method to render customized value for the column. See this <a href="https://angular-tree-grid.stackblitz.io/basic_tree_grid">Example</a>.  |
| type  | string  |  '' | Set to 'custom' to have custom component for the column. Otherwise leave blank.  |
| component  | Object  |  n/a | Custom View Component. Mandatory if type is custom.See this <a href="https://angular-tree-grid.stackblitz.io/custom_view_component">Example</a>.|
| editor  | Object  |  n/a | Custom Editor Component. If given custom editor component will be used instead of default editor. See this <a href="https://angular-tree-grid.stackblitz.io/custom_edit_component">Example</a>.  |
| on_component_init  | Function  |  n/a | Callback function for the column on component init.  |
| summary_renderer  | Function  |  n/a | Renderer for summary. See this <a href="https://debabratapatra.github.io/pages/angular-tree-grid/demo/#/summary_row">Example</a> for more information. |
| sortable  | boolean  |  false | Sort Column. Only available for subgrid feature.  |

##### subgrid_config
| Field  |Type   |Default |  Description |
|---|---|---|---|
| *id_field  | string  |  n/a | It’s a mandatory field. It is the primary key of child data.  |
|  data_loading_text |  string | 'Loading...'  |  Loading place holder. This will be displayed when data is getting loaded. |
| show_summary_row  | boolean  |  false | To show summary row. It defaults to false. Use summary_renderer at the column level. |
| columns  | Array  |  n/a | See above columns table.  |

#### Example
```
  configs: any = {
    id_field: 'id',
    parent_id_field: 'parent',
    columns: [
      {
        name: 'name',
        header: 'Name',
      },
      {
        name: 'age',
        header: 'Age',
        renderer: function(value) {
          return value + ' years';
        }
      }
    ]
  };
```

#### Events

| Event  |Arguments   | Description |
|---|---|---|
| expand  | **row_data:** Expanded Row <br/> For Subgrid and Dynamic-Children-Loading:<br/> **event** Consist of: <ul><li> **data:** Selected Row </li><li> **resolve:** Promise Object</li></ul> | Event fires when parent is expanded. For Subgrid, see this <a href="https://angular-tree-grid.stackblitz.io/subgrid">Example</a>. For Dynamic-Children-Loading, see this <a href="https://angular-tree-grid.stackblitz.io/dynamic_children">Example</a> |
| collapse  | **row_data:** Collapsed Row | Event fires when parent is collapsed.  |
| cellclick  | **event** Consist of: <ul><li> **row:** Selected Row </li><li> **column:** Selected Column</li><li> **event:** Selected Column</li></ul> | Event fires when a child cell is clicked.  |
| rowselect  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is selected.  |
| rowdeselect  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is deselected.  |
| rowselectall  | **event:** Event Object | Event fires when select-all checkbox is checked.  |
| rowdeselectall  | **event:** Event Object | Event fires when select-all checkbox is unchecked.  |
| rowsave  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is saved.  |
| rowdelete  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is deleted.  |
| rowadd  | **event** Consist of: <ul><li> **data:** Selected Row </li><li> **event:** Event Object</li></ul> | Event fires when a row is added.  |

### HTML
Add below node to your html.
```
  <db-angular-tree-grid [data]="data" [configs]="configs"></db-angular-tree-grid>
```

#### Functions
AngularTreeGridComponent has some very useful functions. Below is an example how to call.
```
    @Component({
      selector: 'app-basic-tree-grid',
      template: `
        <button (click)="collapseAll()">Collapse All</button><button (click)="expandAll()">Expand All</button>
        <p></p>
        <db-angular-tree-grid #angularGrid [data]="data" [configs]="configs"></db-angular-tree-grid>
      `
    })
    export class BasicTreeGridComponent {
      @ViewChild('angularGrid') angularGrid: AngularTreeGridComponent;
    
      expandAll() {
        this.angularGrid.expandAll();
      }
      collapseAll() {
        this.angularGrid.collapseAll();
      }
    }
```
| Function  |Arguments   | Description |
|---|---|---|
| expandAll  | None | Expands all rows  |
| collapseAll  | None | Collapses all rows  |
| selectAll  | None | Selects all rows  |
| deSelectAll  | None | DeSelects all rows  |
| expandRow  | <ul><li> id: Row id(Primary Key) </li><li> suppress_event: Suppress expand event. It defaults to false.</li></ul> | Expands a specific row. see this <a href="https://angular-tree-grid.stackblitz.io/specific_expand_collapse">Example</a>. |
| collapseRow  | <ul><li> id: Row id(Primary Key) </li><li> suppress_event: Suppress expand event. It defaults to false.</li></ul> | Collapses a specific row. see this <a href="https://angular-tree-grid.stackblitz.io/specific_expand_collapse">Example</a>. |
| disableRowSelection  |  id: Row id(Primary Key) | Disables Row Selection for the specific Row id. |
| enableRowSelection  |  id: Row id(Primary Key) | Enables Row Selection for the specific Row id. |
| disableRowExpand  |  id: Row id(Primary Key) | Disables Row Expand for the specific Row id. |
| enableRowExpand  |  id: Row id(Primary Key) | Enables Row Expand for the specific Row id. |

### Can I hire you guys?
Yes. Please contact us at <a href="mailto:debabratapatra12@gmail.com">debabratapatra12@gmail.com</a>. We will be happy to work with you!

## License
This project is licensed under the MIT license.
