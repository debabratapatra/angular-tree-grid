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
      <ng-template #dynamicTarget></ng-template>
    `,
})
export class CustomCellViewComponent implements OnInit, OnDestroy {
    customComponent: any;
    @Input() column: Column;
    @Input() row_data;
    @ViewChild('dynamicTarget', { read: ViewContainerRef }) dynamicTarget: any;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
      if (this.column.component && !this.customComponent) {
        this.createCustomComponent();
        this.callOnComponentInit();
      }
    }

    ngOnDestroy() {
      if (this.customComponent) {
        this.customComponent.destroy();
      }
    }

    protected createCustomComponent() {
      const componentFactory = this.resolver.resolveComponentFactory(this.column.component);
      this.customComponent = this.dynamicTarget.createComponent(componentFactory);
    }

    protected callOnComponentInit() {
      this.customComponent.instance.cell_value = this.row_data[this.column.name];
      this.customComponent.instance.row_data = this.row_data;
      this.column.onComponentInit && this.column.onComponentInit(this.customComponent.instance);
    }
}
