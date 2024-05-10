import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsSaveComponent } from './dialogs.save.component';

describe('DialogsComponent', () => {
  let component: DialogsSaveComponent;
  let fixture: ComponentFixture<DialogsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogsSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
