import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeBodyComponent } from './tree-body.component';
import { TreeCellModule } from '../tree-cell/tree-cell.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TreeBodyComponent],
  imports: [
    CommonModule,
    TreeCellModule,
    FormsModule
  ],
  exports: [TreeBodyComponent]
})
export class TreeBodyModule { }
