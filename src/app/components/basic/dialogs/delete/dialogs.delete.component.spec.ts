import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsDeleteComponent } from './dialogs.delete.component';

describe('DialogsComponent', () => {
  let component: DialogsDeleteComponent;
  let fixture: ComponentFixture<DialogsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogsDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
