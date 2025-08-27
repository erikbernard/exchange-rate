import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyExchangeItemComponent } from './daily-exchange-item.component';

describe('DailyExchangeItemComponent', () => {
  let component: DailyExchangeItemComponent;
  let fixture: ComponentFixture<DailyExchangeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyExchangeItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyExchangeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
