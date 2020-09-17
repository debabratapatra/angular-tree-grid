import { Output, EventEmitter, Component } from '@angular/core';

@Component({
    selector: '',
    template: '',
})
export class DefaultEditor implements Editor {
    @Output() canceledit = new EventEmitter<any>();
    @Output() editcomplete = new EventEmitter<any>();
    @Output() cellclick = new EventEmitter<any>();
}

export interface Editor {
    canceledit: EventEmitter<any>;
    editcomplete: EventEmitter<any>;
    cellclick: EventEmitter<any>;
}
