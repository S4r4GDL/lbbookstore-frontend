import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBasicWithDisableComponent } from './select-basic-with-disable.component';

describe('PublishersSelectComponent', () => {
  let component: SelectBasicWithDisableComponent;
  let fixture: ComponentFixture<SelectBasicWithDisableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBasicWithDisableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBasicWithDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
