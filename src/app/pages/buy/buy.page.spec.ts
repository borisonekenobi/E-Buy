import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BuyPage} from './buy.page';

describe('BuyComponent', () => {
  let component: BuyPage;
  let fixture: ComponentFixture<BuyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
