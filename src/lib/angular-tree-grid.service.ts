import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularTreeGridService {

  private display_data_observable = new Subject<any[]>();
  display_data_observable$ = this.display_data_observable.asObservable();

  constructor() { }

  updateDisplayDataObservable(display_data: any[]) {
    this.display_data_observable.next(display_data);
  }

  expandAll(expand_tracker) {
    for (const key in expand_tracker) {
      if (expand_tracker.hasOwnProperty(key)) {
        expand_tracker[key] = true;
      }
    }
  }

  collapseAll(expand_tracker) {
    for (const key in expand_tracker) {
      if (expand_tracker.hasOwnProperty(key)) {
        expand_tracker[key] = false;
      }
    }
  }
}
