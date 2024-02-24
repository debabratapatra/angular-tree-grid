import { Component, OnInit, Input } from "@angular/core";
import { Column } from "../../../../../models/Column.model";

@Component({
  selector: "db-tree-cell-view",
  templateUrl: "./tree-cell-view.component.html",
  styleUrls: ["./tree-cell-view.component.scss"],
})
export class TreeCellViewComponent implements OnInit {
  @Input()
  column!: Column;

  @Input()
  row_data: any;

  constructor() {}

  ngOnInit() {}
}
