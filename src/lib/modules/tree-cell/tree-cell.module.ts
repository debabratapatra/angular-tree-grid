import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeCellComponent } from './tree-cell.component';
import { TreeCellViewComponent } from './components/tree-cell-view/default/tree-cell-view.component';
import { CustomCellViewComponent } from './components/tree-cell-view/custom/custom-tree-cell.component';
import { TreeCellActionsComponent } from './components/tree-cell-actions/tree-cell-actions.component';

@NgModule({
  declarations: [
    TreeCellComponent,
    TreeCellViewComponent,
    CustomCellViewComponent,
    TreeCellActionsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [TreeCellComponent, TreeCellActionsComponent]
})
export class TreeCellModule { }
