import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakerComponent } from './taker.component';

describe('TakerComponent', () => {
  let component: TakerComponent;
  let fixture: ComponentFixture<TakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
