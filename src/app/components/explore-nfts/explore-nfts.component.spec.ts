import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreNftsComponent } from './explore-nfts.component';

describe('ExploreNftsComponent', () => {
  let component: ExploreNftsComponent;
  let fixture: ComponentFixture<ExploreNftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreNftsComponent]
    });
    fixture = TestBed.createComponent(ExploreNftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
