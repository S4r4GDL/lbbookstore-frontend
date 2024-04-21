import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MugListComponent } from './mug-list.component';

describe('MugsListComponent', () => {
  let component: MugListComponent;
  let fixture: ComponentFixture<MugListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MugListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MugListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
