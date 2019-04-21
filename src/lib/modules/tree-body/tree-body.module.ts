import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeBodyComponent } from './tree-body.component';
import { TreeCellModule } from '../tree-cell/tree-cell.module';

@NgModule({
  declarations: [TreeBodyComponent],
  imports: [
    CommonModule,
    TreeCellModule
  ],
  exports: [TreeBodyComponent]
})
export class TreeBodyModule { }
