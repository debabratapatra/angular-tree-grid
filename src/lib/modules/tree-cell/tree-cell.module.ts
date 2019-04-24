import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeCellComponent } from './tree-cell.component';
import { TreeCellViewComponent } from './components/tree-cell-view/default/tree-cell-view.component';
import { CustomCellViewComponent } from './components/tree-cell-view/custom/custom-tree-cell.component';

@NgModule({
  declarations: [TreeCellComponent, TreeCellViewComponent, CustomCellViewComponent],
  imports: [
    CommonModule
  ],
  exports: [TreeCellComponent]
})
export class TreeCellModule { }
