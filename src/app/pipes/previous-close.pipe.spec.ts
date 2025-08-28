import { DailyExchangeRateData } from '../models/ExchangeRate.model';
import { PreviousClosePipe } from './previous-close.pipe';

describe('PreviousClosePipe', () => {
  const pipe = new PreviousClosePipe();

  // Mock
  const MOCK_HISTORY: DailyExchangeRateData[] = [
    { date: '2025-08-26', open: 5.1, close: 5.2, high: 5.3, low: 5.0 }, // index 0
    { date: '2025-08-25', open: 5.0, close: 5.1, high: 5.2, low: 4.9 }, // index 1
    { date: '2025-08-24', open: 4.9, close: 5.0, high: 5.1, low: 4.8 }, // index 2
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Must return the closing value of the next item in the array', () => {
    const result = pipe.transform(MOCK_HISTORY, 0);
    expect(result).toBe(MOCK_HISTORY[1].close); // Esperado: 5.1
  });

  it('Must return the correct closing value for an item in the middle of the array', () => {
    const result = pipe.transform(MOCK_HISTORY, 1);
    expect(result).toBe(MOCK_HISTORY[2].close); // Esperado: 5.0
  });

  it('Must return 0 if the index is the last item in the array', () => {
    const result = pipe.transform(MOCK_HISTORY, 2);
    expect(result).toBe(0);
  });

  it('Must return 0 if history is null', () => {
    const result = pipe.transform(null as any, 0);
    expect(result).toBe(0);
  });

  it('Must return 0 if history is undefined', () => {
    const result = pipe.transform(undefined as any, 0);
    expect(result).toBe(0);
  });

  it('Must return 0 if history is not an array', () => {
    const result = pipe.transform({} as any, 0);
    expect(result).toBe(0);
  });

  it('Must return 0 if history is an empty array', () => {
    const result = pipe.transform([], 0);
    expect(result).toBe(0);
  });
});
