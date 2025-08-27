import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyExchangeListComponent } from './daily-exchange-list.component';

describe('DailyExchangeListComponent', () => {
  let component: DailyExchangeListComponent;
  let fixture: ComponentFixture<DailyExchangeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyExchangeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyExchangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
