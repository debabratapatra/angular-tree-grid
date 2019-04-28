import { NgModule } from '@angular/core';
import { AngularTreeGridComponent } from './angular-tree-grid.component';
import { CommonModule } from '@angular/common';
import { TreeBodyModule } from './modules/tree-body/tree-body.module';
import { TreeHeadModule } from './modules/tree-head/tree-head.module';

@NgModule({
  declarations: [AngularTreeGridComponent],
  imports: [
    CommonModule,
    TreeBodyModule,
    TreeHeadModule
  ],
  exports: [AngularTreeGridComponent]
})
export class AngularTreeGridModule { }

export {DefaultEditor} from './modules/tree-cell/components/tree-cell-editor/default/default-editor.component';
