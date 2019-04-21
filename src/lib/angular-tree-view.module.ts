import { NgModule } from '@angular/core';
import { AngularTreeViewComponent } from './angular-tree-view.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AngularTreeViewComponent],
  imports: [
    CommonModule,
  ],
  exports: [AngularTreeViewComponent]
})
export class AngularTreeViewModule { }
