import { Output, EventEmitter } from '@angular/core';

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
