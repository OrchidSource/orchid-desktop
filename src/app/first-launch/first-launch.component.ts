import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}
const LAST_LOCATION_LOCALSTORAGE_KEY = "FIRST_RUN_LAST_LOCATION";

@Component({
  selector: 'app-first-launch',
  templateUrl: './first-launch.component.html',
  styleUrls: ['./first-launch.component.scss']
})
export class FirstLaunchComponent implements OnInit {

  @ViewChild('noticeModal') noticeModal: TemplateRef<any>;

  /** The page number */
  public page: number = 1;
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    var lastPage = this.getLastPage();
    if (lastPage) {
      this.page = lastPage;
    }
  }

  changePage (page) {
    this.page = page;

    var lastPage = this.getLastPage();

    if (!lastPage || (lastPage && this.page > Number(lastPage))) {
      localStorage.setItem(LAST_LOCATION_LOCALSTORAGE_KEY, page);
    }
  }

  firstRunDone() {
    localStorage.setItem(LAST_LOCATION_LOCALSTORAGE_KEY, 'DONE');
  }

  private getLastPage() {
    var page = localStorage.getItem(LAST_LOCATION_LOCALSTORAGE_KEY);
    if (page) {
      return Number(page);
    } else {
      return null;
    }
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
