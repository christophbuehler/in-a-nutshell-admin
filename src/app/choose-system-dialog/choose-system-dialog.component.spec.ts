import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSystemDialogComponent } from './choose-system-dialog.component';

describe('ChooseSystemDialogComponent', () => {
  let component: ChooseSystemDialogComponent;
  let fixture: ComponentFixture<ChooseSystemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseSystemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSystemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
