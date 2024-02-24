import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TreeHeadComponent } from "./tree-head.component";
import { PipesModuleModule } from "../../pipes/pipes-module.module";

@NgModule({
  declarations: [TreeHeadComponent],
  imports: [CommonModule, PipesModuleModule],
  exports: [TreeHeadComponent],
})
export class TreeHeadModule {}
