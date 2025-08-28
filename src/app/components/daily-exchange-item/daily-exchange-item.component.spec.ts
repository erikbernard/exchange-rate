import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyExchangeItemComponent } from './daily-exchange-item.component';
import {
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { DailyExchangeRateData } from '../../models/ExchangeRate.model';
import { ARROW_DOWN, ARROW_UP } from '../constants';
import { By } from '@angular/platform-browser';

// Mock CalculateDiffPipe
@Pipe({
  name: 'calculateDiff',
  standalone: true,
})
class MockCalculateDiffPipe implements PipeTransform {
  // Usar propriedade estática para poder definir o valor de retorno de fora.
  static returnValue: number | null = 0;
  transform(value: any, ...args: any[]): number | null {
    return MockCalculateDiffPipe.returnValue;
  }
}

describe('DailyExchangeItemComponent', () => {
  let component: DailyExchangeItemComponent;
  let fixture: ComponentFixture<DailyExchangeItemComponent>;

  const MOCK_ITEM: DailyExchangeRateData = {
    date: '2025-08-26T03:00:00.000Z',
    open: 5.1,
    close: 5.25,
    high: 5.3,
    low: 5.05,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyExchangeItemComponent, MockCalculateDiffPipe],
      providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' }, // locale brasileiro
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }, // moeda padrão
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyExchangeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not render anything if Daily Exchange Rate data was not provided', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.daily-item'));
    expect(container).toBeFalsy();
  });

  describe('when the Daily Exchange Rate is provided', () => {
    beforeEach(() => {
      component.item = MOCK_ITEM;
      component.previousClose = 5.0;
    });

    it('should render the date and exchange rates correctly formatted', () => {
      fixture.detectChanges();
      const dateEl = fixture.debugElement.query(By.css('.daily-item__date'));
      const openEl = fixture.debugElement.query(By.css('.daily-item__value'));

      expect(dateEl.nativeElement.textContent.trim()).toBe('26/08/2025');
      expect(openEl.nativeElement.textContent.trim()).toBe('R$\u00A05,1000');
    });

    it('should display the positive difference with the class and the up arrow', () => {
      MockCalculateDiffPipe.returnValue = 5.0;
      fixture.detectChanges();

      const diffContainer = fixture.debugElement.query(
        By.css('.daily-item__diff')
      );
      const diffValue = diffContainer.query(By.css('span:first-child'));
      const diffArrow = diffContainer.query(By.css('span:last-child'));

      expect(diffContainer).toBeTruthy();
      expect(diffContainer.classes['daily-item__diff--positive']).toBe(true);
      expect(diffContainer.classes['daily-item__diff--negative']).toBeFalsy();
      expect(diffValue.nativeElement.textContent.trim()).toBe('5,00%');
      expect(diffArrow.nativeElement.innerHTML).toContain(ARROW_UP);
    });

    it('should display the negative difference with the class and the down arrow', () => {
      MockCalculateDiffPipe.returnValue = -2.5;
      fixture.detectChanges();

      const diffContainer = fixture.debugElement.query(
        By.css('.daily-item__diff')
      );
      const diffValue = diffContainer.query(By.css('span:first-child'));
      const diffArrow = diffContainer.query(By.css('span:last-child'));

      expect(diffContainer).toBeTruthy();
      expect(diffContainer.classes['daily-item__diff--positive']).toBeFalsy();
      expect(diffContainer.classes['daily-item__diff--negative']).toBe(true);
      expect(diffValue.nativeElement.textContent.trim()).toBe('-2,50%');
      expect(diffArrow.nativeElement.innerHTML).toContain(ARROW_DOWN);
    });
  });
});
