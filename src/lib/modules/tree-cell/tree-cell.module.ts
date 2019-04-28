import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeCellComponent } from './tree-cell.component';
import { TreeCellViewComponent } from './components/tree-cell-view/default/tree-cell-view.component';
import { CustomCellViewComponent } from './components/tree-cell-view/custom/custom-tree-cell.component';
import { TreeCellActionsComponent } from './components/tree-cell-actions/tree-cell-actions.component';
import { CustomCellEditorComponent } from './components/tree-cell-editor/custom/custom-tree-cell-Editor.component';
import { TreeCellEditorComponent } from './components/tree-cell-editor/default/cell-editor/tree-cell-editor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TreeCellComponent,
    TreeCellViewComponent,
    CustomCellViewComponent,
    TreeCellActionsComponent,
    CustomCellEditorComponent,
    TreeCellEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TreeCellComponent,
    CustomCellViewComponent,
    CustomCellEditorComponent,
    TreeCellEditorComponent,
    TreeCellActionsComponent
  ]
})
export class TreeCellModule { }
