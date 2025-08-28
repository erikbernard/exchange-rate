import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { CurrentExchangeComponent } from './current-exchange.component';
import { CurrentExchangeRate } from '../../models/ExchangeRate.model';
import { By } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

describe('CurrentExchangeComponent', () => {
  let component: CurrentExchangeComponent;
  let fixture: ComponentFixture<CurrentExchangeComponent>;

  const MOCK_RATE: CurrentExchangeRate = {
    success: true,
    lastUpdatedAt: '2025-08-25T15:09:00.000+00:00',
    fromSymbol: 'USD',
    toSymbol: 'BRL',
    exchangeRate: 5.4321
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentExchangeComponent],
      providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' }, // locale brasileiro
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' } // moeda padrão
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentExchangeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render content when rate is not provided', () => {
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.current-rate'));
    expect(container).toBeFalsy();
  });

  describe('when the rate is given', () => {
    beforeEach(() => {
      component.rate = MOCK_RATE;
      fixture.detectChanges();
    });

    it('must render the main containerl', () => {
      const container = fixture.debugElement.query(By.css('.current-rate'));
      expect(container).toBeTruthy();
    });

    it('must display currency symbols correctly', () => {
      const symbols = fixture.debugElement.query(By.css('.current-rate__symbols'));
      expect(symbols.nativeElement.textContent.trim()).toBe('USD/BRL');
    });

    it('should display the timestamp formatted correctly for the local time zone', () => {
      const timestampEl = fixture.debugElement.query(By.css('.current-rate__timestamp'));
      const expectedDate = `25/08/2025 - 12:09`;

      expect(timestampEl.nativeElement.textContent.trim()).toBe(expectedDate);
    });

    it('must display the exchange rate value formatted as Brazilian currency', () => {
      const valueEl = fixture.debugElement.query(By.css('.current-rate__value'));
      expect(valueEl.nativeElement.textContent.trim()).toBe('R$\u00A05,43');//aqui foi triste
    });
  });
});
