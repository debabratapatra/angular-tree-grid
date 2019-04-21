import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeCellComponent } from './tree-cell.component';

@NgModule({
  declarations: [TreeCellComponent],
  imports: [
    CommonModule
  ],
  exports: [TreeCellComponent]
})
export class TreeCellModule { }
