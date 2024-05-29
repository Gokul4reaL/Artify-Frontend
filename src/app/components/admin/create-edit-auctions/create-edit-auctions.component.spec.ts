import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAuctionsComponent } from './create-edit-auctions.component';

describe('CreateEditAuctionsComponent', () => {
  let component: CreateEditAuctionsComponent;
  let fixture: ComponentFixture<CreateEditAuctionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditAuctionsComponent]
    });
    fixture = TestBed.createComponent(CreateEditAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
