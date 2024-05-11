import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsErrorComponent } from './dialogs.error.component';

describe('DialogsComponent', () => {
  let component: DialogsErrorComponent;
  let fixture: ComponentFixture<DialogsErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogsErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
