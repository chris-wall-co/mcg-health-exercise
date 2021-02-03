import {
    test,
    expect
} from '@jest/globals';
import {
    PrettyNumbers
} from './pretty-numbers';

// non-covered magnitudes
test('returns hundreds and thousands unaltered', () => {
    const pn = new PrettyNumbers();

    expect(pn.pretty(2)).toBe('2');
    expect(pn.pretty(25)).toBe('25');
    expect(pn.pretty(253)).toBe('253');
    expect(pn.pretty(2534)).toBe('2534');
    expect(pn.pretty(25345)).toBe('25345');
    expect(pn.pretty(253450)).toBe('253450');
});

// basic rounding
test('rounds base numbers correctly', () => {
    const pn = new PrettyNumbers();

    // base numbers
    expect(pn.pretty(1000000)).toBe('1M');
    expect(pn.pretty(1000000000)).toBe('1B');
    expect(pn.pretty(1000000000000)).toBe('1T');

    // multi-digit within range
    expect(pn.pretty(99000000)).toBe('99M');
    expect(pn.pretty(99000000000)).toBe('99B');
    expect(pn.pretty(99000000000000)).toBe('99T');
});

// negative numbers
test('rounds base numbers correctly', () => {
    const pn = new PrettyNumbers();

    // base numbers
    expect(pn.pretty(-1000000)).toBe('-1M');
    expect(pn.pretty(-1000000000)).toBe('-1B');
    expect(pn.pretty(-1000000000000)).toBe('-1T');

    // multi-digit within range
    expect(pn.pretty(-99000000)).toBe('-99M');
    expect(pn.pretty(-99000000000)).toBe('-99B');
    expect(pn.pretty(-99000000000000)).toBe('-99T');
});

// roudning down
test('rounds base numbers down correctly', () => {
    const pn = new PrettyNumbers();

    // base numbers
    expect(pn.pretty(1020000)).toBe('1M');
    expect(pn.pretty(1020000000)).toBe('1B');
    expect(pn.pretty(1020000000000)).toBe('1T');

    // multi-digit within range
    expect(pn.pretty(75020000)).toBe('75M');
    expect(pn.pretty(203020000000)).toBe('203B');
    expect(pn.pretty(64020000000000)).toBe('64T');
});

// rounding down with a single decimal place
test('rounds down to single decimal place', () => {
    const pn = new PrettyNumbers();

    // base numbers
    expect(pn.pretty(1320000)).toBe('1.3M');
    expect(pn.pretty(1320000000)).toBe('1.3B');
    expect(pn.pretty(1320000000000)).toBe('1.3T');

    // multi-digit within range
    expect(pn.pretty(75820000)).toBe('75.8M');
    expect(pn.pretty(203820000000)).toBe('203.8B');
    expect(pn.pretty(64820000000000)).toBe('64.8T');
});

// roudning up
test('rounds base numbers up correctly', () => {
    const pn = new PrettyNumbers();

    // base numbers
    expect(pn.pretty(1020000)).toBe('1M');
    expect(pn.pretty(1020000000)).toBe('1B');
    expect(pn.pretty(1020000000000)).toBe('1T');

    // multi-digit within range
    expect(pn.pretty(75020000)).toBe('75M');
    expect(pn.pretty(203020000000)).toBe('203B');
    expect(pn.pretty(64020000000000)).toBe('64T');
});

// rounding up with a single decimal place
test('rounds up to single decimal place', () => {
    const pn = new PrettyNumbers();

    // base numbers
    expect(pn.pretty(1350000)).toBe('1.4M');
    expect(pn.pretty(1360000000)).toBe('1.4B');
    expect(pn.pretty(1370000000000)).toBe('1.4T');

    // multi-digit within range
    expect(pn.pretty(75880000)).toBe('75.9M');
    expect(pn.pretty(203870000000)).toBe('203.9B');
    expect(pn.pretty(64850000000000)).toBe('64.9T');
});

test('pretty should correctly parse numeric strings', () => {
    const pn = new PrettyNumbers();

    // base numbers
    expect(pn.pretty('1350000')).toBe('1.4M');
    expect(pn.pretty('1360000000')).toBe('1.4B');
    expect(pn.pretty('1370000000000')).toBe('1.4T');

    // multi-digit within range
    expect(pn.pretty('75880000')).toBe('75.9M');
    expect(pn.pretty('203870000000')).toBe('203.9B');
    expect(pn.pretty('64850000000000')).toBe('64.9T');
});

/* NEGATIVE TESTS */
test('expect error on NaN string', () => {
    const pn = new PrettyNumbers();

    expect(() => pn.pretty('ABCD')).toThrow();
});

// Because parseInt will allow bad strings if it starts with a number and has spaces we need to test regex
test('expect error on spaces or comma in number string', () => {
    const pn = new PrettyNumbers();
    expect(() => pn.pretty('1 * 6')).toThrow();
});