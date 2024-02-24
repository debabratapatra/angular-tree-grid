import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SafeHtmlPipe } from "./pipe.safehtml";

@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [CommonModule],
  exports: [SafeHtmlPipe],
})
export class PipesModuleModule {}
