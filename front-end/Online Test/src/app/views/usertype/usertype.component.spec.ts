import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertypeComponent } from './usertype.component';

describe('UsertypeComponent', () => {
  let component: UsertypeComponent;
  let fixture: ComponentFixture<UsertypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
