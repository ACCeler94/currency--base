import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN if input is text', () => {
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('50')).toBeNaN();
    expect(convertPLNToUSD('0')).toBeNaN();
  });
  it('should return Nan if input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });
  it('throw error if argument is neither text nor number', () => {
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(function () { }
    )).toBe('Error');
  })
  it('should return $0.00 if the number is less than 0', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-10)).toBe('$0.00');
    expect(convertPLNToUSD(-24)).toBe('$0.00');
  })
});
