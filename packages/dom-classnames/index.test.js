// @flow
/* eslint-disable flowtype/no-weak-types */

import { default as classNames, join } from './index';

describe('classNames', () => {
  function describeJoin(classNamesJoin: (a: Array<*>) => string) {
    return () => {
      test('keeps object keys with truthy values', () => {
        expect(
          classNamesJoin([
            {
              a: true,
              b: false,
              c: (0: any),
              d: null,
              e: undefined,
              f: (1: any),
            },
          ])
        ).toBe('a f');
      });

      test('joins arrays of class names and ignore falsy values except 0', () => {
        expect(
          classNamesJoin([
            'a',
            (0: any),
            null,
            undefined,
            (true: any),
            (1: any),
            'b',
          ])
        ).toBe('a 0 1 b');
      });

      test('supports heterogenous arguments', () => {
        expect(classNamesJoin([{ a: true }, 'b', (0: any)])).toBe('a b 0');
      });

      test('should be trimmed', () => {
        expect(classNamesJoin(['', 'b', {}, ''])).toBe('b');
      });

      test('returns an empty string for an empty configuration', () => {
        expect(classNamesJoin([{}])).toBe('');
      });

      test('supports an array of class names', () => {
        expect(classNamesJoin([['a', 'b']])).toBe('a b');
      });

      test('joins array arguments with string arguments', () => {
        expect(classNamesJoin([['a', 'b'], 'c'])).toBe('a b c');
        expect(classNamesJoin(['c', ['a', 'b']])).toBe('c a b');
      });

      test('handles multiple array arguments', () => {
        expect(classNamesJoin([['a', 'b'], ['c', 'd']])).toBe('a b c d');
      });

      test('handles arrays that include falsy and true values', () => {
        expect(
          classNamesJoin([
            ['a', (0: any), null, undefined, false, (true: any), 'b'],
          ])
        ).toBe('a 0 b');
      });

      test('handles arrays that include arrays', () => {
        expect(classNamesJoin([['a', ['b', 'c']]])).toBe('a b c');
      });

      test('handles arrays that include objects', () => {
        expect(classNamesJoin([['a', { b: true, c: false }]])).toBe('a b');
      });

      test('handles deep array recursion', () => {
        expect(classNamesJoin([['a', ['b', ['c', { d: true }]]]])).toBe(
          'a b c d'
        );
      });
    };
  }

  describe('.join(...parts)', describeJoin(join));

  describe('()', describeJoin((...args: *) => classNames.apply(null, args)));
});
