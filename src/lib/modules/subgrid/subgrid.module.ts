import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubgridComponent } from './subgrid.component';
import { TreeCellModule } from '../tree-cell/tree-cell.module';
import { SubgridHeadComponent } from './components/subgrid-head/subgrid-head.component';
import { SubgridBodyComponent } from './components/subgrid-body/subgrid-body.component';

@NgModule({
  declarations: [SubgridComponent, SubgridHeadComponent, SubgridBodyComponent],
  imports: [
    CommonModule,
    TreeCellModule
  ],
  exports: [SubgridComponent]
})
export class SubgridModule { }
