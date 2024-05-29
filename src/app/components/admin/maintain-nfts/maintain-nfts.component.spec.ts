import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainNftsComponent } from './maintain-nfts.component';

describe('MaintainNftsComponent', () => {
  let component: MaintainNftsComponent;
  let fixture: ComponentFixture<MaintainNftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintainNftsComponent]
    });
    fixture = TestBed.createComponent(MaintainNftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
