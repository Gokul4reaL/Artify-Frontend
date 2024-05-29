import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStyleTransferComponent } from './multi-style-transfer.component';

describe('MultiStyleTransferComponent', () => {
  let component: MultiStyleTransferComponent;
  let fixture: ComponentFixture<MultiStyleTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiStyleTransferComponent]
    });
    fixture = TestBed.createComponent(MultiStyleTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
