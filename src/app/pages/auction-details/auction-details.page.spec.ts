import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuctionDetailsPage} from './auction-details.page';

describe('AuctionDetailsComponent', () => {
  let component: AuctionDetailsPage;
  let fixture: ComponentFixture<AuctionDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
