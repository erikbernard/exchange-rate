import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyExchangeListComponent } from './daily-exchange-list.component';
import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { DailyExchangeRateData } from '../../models/ExchangeRate.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

//Mock do component (DailyExchangeItemComponent)
@Component({
  selector: 'app-daily-exchange-item',
  standalone: true,
})
class MockDailyExchangeItemComponent {
  @Input() item!: DailyExchangeRateData;
  @Input() previousClose: number = 0;
}

//Mock do pipe (PreviousClosePipe)
@Pipe({
  name: 'previousClose',
  standalone: true,
})
class MockPreviousClosePipe implements PipeTransform {
  transform(history: DailyExchangeRateData[], index: number): number {
    return 1.0;
  }
}

describe('DailyExchangeListComponent', () => {
  let component: DailyExchangeListComponent;
  let fixture: ComponentFixture<DailyExchangeListComponent>;

  const MOCK_HISTORY: DailyExchangeRateData[] = [
    { date: '2025-08-26', open: 5.1, close: 5.2, high: 5.3, low: 5.0 },
    { date: '2025-08-25', open: 5.0, close: 5.1, high: 5.2, low: 4.9 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DailyExchangeListComponent,
        MockDailyExchangeItemComponent,
        MockPreviousClosePipe,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyExchangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must start with the accordion closed and call the get of the "plus" icon', () => {
    const plusSpy = spyOnProperty(component, 'plusIcon', 'get').and.callThrough();
    fixture.detectChanges();

    expect(component.isOpen).toBe(false);
    const content = fixture.debugElement.query(By.css('.daily-list__content'));
    expect(content).toBeFalsy();
    
    expect(plusSpy).toHaveBeenCalled();
  });

  it('should open the accordion, display the content and call the "minus" icon getter on click', () => {
    fixture.detectChanges(); 
    
    const minusSpy = spyOnProperty(component, 'minusIcon', 'get').and.callThrough();
    const header = fixture.debugElement.query(By.css('.daily-list__accordion-header'));
    header.nativeElement.click();
    fixture.detectChanges();

    expect(component.isOpen).toBe(true);
    const content = fixture.debugElement.query(By.css('.daily-list__content'));
    expect(content).toBeTruthy();

    expect(minusSpy).toHaveBeenCalled();
  });

  it('should close the accordion on a second click', () => {
    const header = fixture.debugElement.query(By.css('.daily-list__accordion-header'));

    header.nativeElement.click();
    fixture.detectChanges();
    expect(component.isOpen).toBe(true);

    header.nativeElement.click();
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);

    const content = fixture.debugElement.query(By.css('.daily-list__content'));
    expect(content).toBeFalsy();
  });

  describe('with historical data', () => {
    beforeEach(() => {
      component.history = MOCK_HISTORY;
      component.toggle();
      fixture.detectChanges();
    });
    
    it('should render the correct amount of child items', () => {
      const items = fixture.debugElement.queryAll(By.css('app-daily-exchange-item'));
      expect(items.length).toBe(MOCK_HISTORY.length);
    });

    it('must pass the correct inputs to the first child component', () => {
        const itemDebugElements = fixture.debugElement.queryAll(By.css('app-daily-exchange-item'));
        const firstItemInstance = itemDebugElements[0].componentInstance as MockDailyExchangeItemComponent;
  
        expect(firstItemInstance.item).toEqual(MOCK_HISTORY[0]);
        expect(firstItemInstance.previousClose).toBe(5.1);
      });
  });
  
  describe('no historical data', () => {
    beforeEach(() => {
      component.history = [];
      component.toggle();
      fixture.detectChanges();
    });

    it('should display "no data" message and no child items', () => {
      const emptyMessage = fixture.debugElement.query(By.css('.daily-list__content p'));
      expect(emptyMessage).toBeTruthy();
      expect(emptyMessage.nativeElement.textContent).toBe('No historical data available.');

      const items = fixture.debugElement.queryAll(By.css('app-daily-exchange-item'));
      expect(items.length).toBe(0);
    });
  });
});
