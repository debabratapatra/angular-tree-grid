import { NgModule } from '@angular/core';
import { AngularTreeViewComponent } from './angular-tree-view.component';
import { CommonModule } from '@angular/common';
import { TreeBodyModule } from './modules/tree-body/tree-body.module';
import { TreeHeadModule } from './modules/tree-head/tree-head.module';

@NgModule({
  declarations: [AngularTreeViewComponent],
  imports: [
    CommonModule,
    TreeBodyModule,
    TreeHeadModule
  ],
  exports: [AngularTreeViewComponent]
})
export class AngularTreeViewModule { }
