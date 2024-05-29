import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsOverlayComponent } from './auctions-overlay.component';

describe('AuctionsOverlayComponent', () => {
  let component: AuctionsOverlayComponent;
  let fixture: ComponentFixture<AuctionsOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuctionsOverlayComponent]
    });
    fixture = TestBed.createComponent(AuctionsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
