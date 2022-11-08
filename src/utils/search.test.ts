import { describe, it, expect } from 'vitest';
import searchFunction from './search';
import mockdb from '../../mockdb';

describe('search function', () => {
  it('returns nothing if nothing is typed', () => {
    expect(searchFunction(mockdb, '')).toHaveLength(0);
  });

  it('ignores upper or lower case', () => {
    expect(searchFunction(mockdb, 'men')).toHaveLength(4);
  });

  it('returns nothing if nothing matches', () => {
    expect(searchFunction(mockdb, 'asdf')).toHaveLength(0);
  });
});
