import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeHeadComponent } from './tree-head.component';
import { AngularTreeGridService } from '../../angular-tree-grid.service';

@NgModule({
  declarations: [TreeHeadComponent],
  imports: [
    CommonModule
  ],
  exports: [TreeHeadComponent],
  providers: [AngularTreeGridService]
})
export class TreeHeadModule { }
