import { AfterContentInit, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-first-launch',
  templateUrl: './first-launch.component.html',
  styleUrls: ['./first-launch.component.scss']
})
export class FirstLaunchComponent implements AfterContentInit, OnInit {

  @ViewChild('noticeModal') noticeModal: TemplateRef<any>;

  /** The page number */
  public page: number = 1;
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.modalService.open(this.noticeModal, { centered: true, size: 'lg' });
    }, 1)
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW && this.page < 3) {
      this.page++;
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW && this.page > 1) {
      this.page--;
    }
  }

}
