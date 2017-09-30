import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellHowToComponent } from './sell-how-to.component';

describe('SellHowToComponent', () => {
  let component: SellHowToComponent;
  let fixture: ComponentFixture<SellHowToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellHowToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellHowToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
