import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-demo-warning',
  templateUrl: './demo-warning.component.html',
  styleUrls: ['./demo-warning.component.scss']
})
export class DemoWarningComponent {

  constructor(private activeModal: NgbActiveModal) { }

  close() {
    this.activeModal.close();
  }

}
