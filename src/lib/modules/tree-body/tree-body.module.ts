import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeBodyComponent } from './tree-body.component';
import { TreeCellModule } from '../tree-cell/tree-cell.module';
import { FormsModule } from '@angular/forms';
import { AddRowComponent } from './components/add-row/add-row.component';
import { FilterRowComponent } from './components/filter-row/filter-row.component';
import { SubgridModule } from '../subgrid/subgrid.module';

@NgModule({
  declarations: [TreeBodyComponent, AddRowComponent, FilterRowComponent],
  imports: [
    CommonModule,
    TreeCellModule,
    FormsModule,
    SubgridModule
  ],
  exports: [TreeBodyComponent]
})
export class TreeBodyModule { }
