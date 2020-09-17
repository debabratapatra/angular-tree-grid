import {
    Component,
    Input,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { Column } from '../../../../../models/Column.model';
import { DefaultEditor } from '../default/default-editor.component';

@Component({
    selector: 'db-custom-cell-editor-component',
    template: `
      <ng-template #customView></ng-template>
    `,
})
export class CustomCellEditorComponent extends DefaultEditor implements OnInit, OnDestroy {
    custom_component: any;
    @Input() column: Column;
    @Input() cell_value;
    @Input() row_data;
    @ViewChild('customView', { read: ViewContainerRef, static: true }) custom_view: any;

    constructor(private resolver: ComponentFactoryResolver) {
      super();
    }

    ngOnInit() {
      if (this.column.editor && !this.custom_component) {
        this.createCustomComponent();
        this.callOnComponentInit();
      }
    }

    ngOnDestroy() {
      if (this.custom_component) {
        this.custom_component.destroy();
      }
    }

    protected createCustomComponent() {
      const componentFactory = this.resolver.resolveComponentFactory(this.column.editor);
      this.custom_component = this.custom_view.createComponent(componentFactory);
    }

    protected callOnComponentInit() {
      this.column.on_component_init && this.column.on_component_init(this.custom_component.instance);

      this.custom_component.instance.cell_value = this.cell_value;
      this.custom_component.instance.row_data = this.row_data;
      this.custom_component.instance.column = this.column;

      this.custom_component.instance.editcomplete.subscribe((event) => this.editcomplete.emit(event));
      this.custom_component.instance.canceledit.subscribe((event) => this.canceledit.emit(event));
      this.custom_component.instance.cellclick.subscribe((event) => this.cellclick.emit(event));
    }
}
