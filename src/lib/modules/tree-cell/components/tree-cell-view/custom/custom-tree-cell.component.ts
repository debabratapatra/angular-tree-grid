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

@Component({
    selector: 'db-custom-cell-component',
    template: `
      <ng-template #customView></ng-template>
    `,
})
export class CustomCellViewComponent implements OnInit, OnDestroy {
    custom_component: any;
    @Input() column: Column;
    @Input() row_data;
    @ViewChild('customView', { read: ViewContainerRef, static: true }) custom_view: any;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
      if (this.column.component && !this.custom_component) {
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
      const componentFactory = this.resolver.resolveComponentFactory(this.column.component);
      this.custom_component = this.custom_view.createComponent(componentFactory);
    }

    protected callOnComponentInit() {
      this.column.on_component_init && this.column.on_component_init(this.custom_component.instance);

      this.custom_component.instance.cell_value = this.row_data[this.column.name];
      this.custom_component.instance.row_data = this.row_data;
      this.custom_component.instance.column = this.column;
    }
}
