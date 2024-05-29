import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleTransferComponent } from './style-transfer.component';

describe('StyleTransferComponent', () => {
  let component: StyleTransferComponent;
  let fixture: ComponentFixture<StyleTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StyleTransferComponent]
    });
    fixture = TestBed.createComponent(StyleTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
