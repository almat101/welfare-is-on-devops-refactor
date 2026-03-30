import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenCaptureComponent } from './token-capture.component';

describe('TokenCaptureComponent', () => {
  let component: TokenCaptureComponent;
  let fixture: ComponentFixture<TokenCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenCaptureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
