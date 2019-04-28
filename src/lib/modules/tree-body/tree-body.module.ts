import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeBodyComponent } from './tree-body.component';
import { TreeCellModule } from '../tree-cell/tree-cell.module';
import { FormsModule } from '@angular/forms';
import { AddRowComponent } from './components/add-row/add-row.component';

@NgModule({
  declarations: [TreeBodyComponent, AddRowComponent],
  imports: [
    CommonModule,
    TreeCellModule,
    FormsModule
  ],
  exports: [TreeBodyComponent]
})
export class TreeBodyModule { }
