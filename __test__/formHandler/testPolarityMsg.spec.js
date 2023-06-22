import { polarityMsg } from '../../src/client/js/formHandler';

describe('polarityMsg', () => {
  it('should return "STRONG POSITIVE" when provided with code "P+"', () => {
    expect(polarityMsg('P+')).toBe('STRONG POSITIVE');
  });

  it('should return "POSITIVE" when provided with code "P"', () => {
    expect(polarityMsg('P')).toBe('POSITIVE');
  });

  it('should return "NEUTRAL" when provided with code "NEU"', () => {
    expect(polarityMsg('NEU')).toBe('NEUTRAL');
  });

  it('should return "NEGATIVE" when provided with code "N"', () => {
    expect(polarityMsg('N')).toBe('NEGATIVE');
  });

  it('should return "STRONG NEGATIVE" when provided with code "N+"', () => {
    expect(polarityMsg('N+')).toBe('STRONG NEGATIVE');
  });

  it('should return "WITHOUT POLARITY" when provided with code "NONE"', () => {
    expect(polarityMsg('NONE')).toBe('WITHOUT POLARITY');
  });

  it('should return "NONE" when provided with an unknown code', () => {
    expect(polarityMsg('unknown')).toBe('NONE');
  });
});

