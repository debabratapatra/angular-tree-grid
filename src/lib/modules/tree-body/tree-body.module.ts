import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeBodyComponent } from './tree-body.component';

@NgModule({
  declarations: [TreeBodyComponent],
  imports: [
    CommonModule
  ],
  exports: [TreeBodyComponent]
})
export class TreeBodyModule { }
