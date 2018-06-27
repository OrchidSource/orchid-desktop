import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DemoWarningComponent } from './demo-warning/demo-warning.component';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

/**
 * Service for showing the "this is all fake" modal, and reporting when that modal
 * has been dismissed
 */
@Injectable()
export class DemoWarningService {

  public warningDismissed: BehaviorSubject<boolean>;

  constructor(private modalService: NgbModal) {
    this.warningDismissed = new BehaviorSubject(false);
  }

  showWarning() {
    this.modalService
      .open(DemoWarningComponent, { centered: true, size: 'lg' })
      .result
      .then(() => this.setWarningDismissed(), () => this.setWarningDismissed());
  }

  setWarningDismissed() {
    console.log('set as dismissed');
    this.warningDismissed.next(true);
  }

}
