import { equalDeep } from '../../shared/utils';

import { isValidDigit, restoreIpAddresses } from './restoreIp';

describe('Restore IP Addresses', () => {
  test.each([
    ['', false],
    ['0', true],
    ['00', false],
    ['1', true],
    ['01', false],
    ['10', true],
    ['111', true],
    ['255', true],
    ['256', false],
    ['1111', false],
  ])('is valid IP digit %p: %p', (digit, valid) => {
    expect(isValidDigit(digit)).toEqual(valid);
  });

  test.each([
    ['000', []],
    ['0000', ['0.0.0.0']],
    ['1111', ['1.1.1.1']],
    ['25525511135', ['255.255.11.135', '255.255.111.35']],
    ['101023', ['1.0.10.23', '1.0.102.3', '10.1.0.23', '10.10.2.3', '101.0.2.3']],
  ])('valid IP addresses for string %p: %p', (input, addresses) => {
    const result = equalDeep(restoreIpAddresses(input), addresses);
    expect(result).toBeTruthy();
  });
});
