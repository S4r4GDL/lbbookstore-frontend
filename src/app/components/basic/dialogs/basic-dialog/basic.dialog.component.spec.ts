import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDialogComponent } from './basic.dialog.component';

describe('DialogsComponent', () => {
  let component: BasicDialogComponent;
  let fixture: ComponentFixture<BasicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
