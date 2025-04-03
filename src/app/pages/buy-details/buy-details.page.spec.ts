import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BuyDetailsPage} from './buy-details.page';

describe('BuyDetailsPage', () => {
  let component: BuyDetailsPage;
  let fixture: ComponentFixture<BuyDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
