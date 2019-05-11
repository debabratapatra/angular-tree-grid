# Angular Tree Grid
Angular Tree Grid to show hierarchical data. If data needs to be grouped by fields then check out this <a href="https://github.com/debabratapatra/ngtreegrid" target="_blank">Package</a>.

## Demo

Click <a href="https://angular-tree-grid.stackblitz.io/" target="_blank">here</a> for demo.

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
    { idx: 1, name: 'Ashok', age: 60, parentx: 0},
    { idx: 2, name: 'Sam', age: 40, parentx: 1},
    { idx: 3, name: 'Sriya', age: 36, parentx: 1},
    { idx: 4, name: 'Prakash', age: 20, parentx: 2},
    { idx: 5, name: 'Sneha', age: 21, parentx: 3},
    { idx: 6, name: 'Pritam', age: 60, parentx: 34},
    { idx: 7, name: 'Roshan', age: 40, parentx: 6},
    { idx: 8, name: 'Suraj', age: 36, parentx: 6},
    { idx: 9, name: 'Swarup', age: 20, parentx: 8},
    { idx: 10, name: 'Aditya', age: 21, parentx: 8},
  ];
```

### Configs
Below are configs that can be set

1. **id_field(Mandatory):** It's a mandatory field. It is a column key.
2. **parent_id_field(Mandatory):** It's a mandatory field. It is a column key.
2. **parent_display_field(Mandatory):** It's a mandatory field. It is the display field of id/parent_id.
8. **actions(Optional):** Action column.
     * **add:** Boolean for add feature. It defaults to false.
     * **edit:** Boolean for edit feature. It defaults to false.
     * **delete:** Boolean for delete feature. It defaults to false.
     * **resolve_add:** Manually resolve add(after making call to server). It defaults to false. See <a href="https://ng-tree-grid.stackblitz.io/resolve_row_add">example</a> for more information.
     * **resolve_edit:** Manually resolve edit. It defaults to false.
     * **resolve_delete:** Manually resolve delete feature. It defaults to false.
5. **css(Optional):** Css class for icons
    * **expand_class(Optional):** Icon class for Expand icon. Font Awesome class can be given.
    * **collapse_class(Optional):** Icon class for Collapse icon. Font Awesome class can be given.
    * **add_class(Optional):** Icon class for Add icon. Font Awesome class can be given.
    * **edit_class(Optional):** Icon class for Edit icon. Font Awesome class can be given.
    * **delete_class(Optional):** Icon class for Delete icon. Font Awesome class can be given.
    * **save_class(Optional):** Icon class for Save icon. Font Awesome class can be given.
    * **cancel_class(Optional):** Icon class for Cancel icon. Font Awesome class can be given.
    * **row_selection_class(Optional):** Class for selected row.
    * **header_class(Optional):** Class for header.
6. **columns(Optional):** It is an Array. If not provided all keys of the data Array will be used as Column Headers. Please find the description below.
    * **name:** key of the column
    * **header:** Header of the column that will be displayed in the table
    * **width:** Width of the column.
    * **hidden:** Show/Hide column. It defaults to false.
    * **editable:** To make a specific column editable. By default columns are not editable. edit option needs to be true at grid level.
    * **renderer:** It is a method to render customized value for the column. See this <a href="https://ng-tree-grid.stackblitz.io/basic_tree_grid">Example</a>.
    * **type:** Set to 'custom' to have custom component for the column. Otherwise leave blank.
    * **component:** Custome View Component. Mandatory if type is custom.
    * **editor:** Custome Editor Component. If given custom editor component will be used instead of default editor. See exampole.
    * **onComponentInit:** Callback function for the column on component init.

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

### HTML
Add below node to your html.
```
  <db-angular-tree-grid [data]="data" [configs]="configs"></db-angular-tree-grid>
```

## License
This project is licensed under the MIT license.
