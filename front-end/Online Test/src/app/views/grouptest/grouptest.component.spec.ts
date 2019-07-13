import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouptestComponent } from './grouptest.component';

describe('GrouptestComponent', () => {
  let component: GrouptestComponent;
  let fixture: ComponentFixture<GrouptestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouptestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouptestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
