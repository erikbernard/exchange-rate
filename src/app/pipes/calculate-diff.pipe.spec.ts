import { DailyExchangeRateData } from '../models/ExchangeRate.model';
import { CalculateDiffPipe } from './calculate-diff.pipe';

describe('CalculateDiffPipe', () => {
  const pipe = new CalculateDiffPipe();

  // Mock
  const MOCK_ITEM: DailyExchangeRateData = {
    date: '2025-08-26',
    open: 5.1,
    close: 5.25,
    high: 5.3,
    low: 5.0,
  };
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Must calculate the positive percentage difference correctly', () => {
    // (5.25 - 5.0) * 100 = 25
    const result = pipe.transform(MOCK_ITEM, 5.0);
    expect(result).toBeCloseTo(25);
  });

  it('Must calculate the negative percentage difference correctly', () => {
    // (5.25 - 5.5) * 100 = -25
    const result = pipe.transform(MOCK_ITEM, 5.5);
    expect(result).toBeCloseTo(-25);
  });

  it('Must return 0 if the difference is zero', () => {
    const result = pipe.transform(MOCK_ITEM, 5.25);
    expect(result).toBe(0);
  });

  it('Must return 0 if the item is null', () => {
    const result = pipe.transform(null, 5.0);
    expect(result).toBe(0);
  });

  it('Must return 0 if the item does not have the "close" property', () => {
    const itemSemClose = { ...MOCK_ITEM, close: undefined as any };
    const result = pipe.transform(itemSemClose, 5.0);
    expect(result).toBe(0);
  });

  it('Must return 0 if the previousClose is 0', () => {
    const result = pipe.transform(MOCK_ITEM, 0);
    expect(result).toBe(0);
  });

  it('Must return 0 if the previousClose is null', () => {
    const result = pipe.transform(MOCK_ITEM, null as any);
    expect(result).toBe(0);
  });

  it('Must return 0 if the previousClose is undefined', () => {
    const result = pipe.transform(MOCK_ITEM, undefined as any);
    expect(result).toBe(0);
  });
});
