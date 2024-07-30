import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterLayoutComponent } from './login-register-layout.component';

describe('LoginRegisterLayoutComponent', () => {
  let component: LoginRegisterLayoutComponent;
  let fixture: ComponentFixture<LoginRegisterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginRegisterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
