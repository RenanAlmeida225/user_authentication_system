import { describe, it, expect, vi } from 'vitest';
import { GenId } from './genId';
const res = '49875adb-80ec-43dd-b4ff-76c97b58f703';

vi.mock('crypto', () => {
	const randomUUID = vi.fn(() => res);
	return { randomUUID };
});

describe('Genid', () => {
	it('should return uuid', () => {
		const sut = new GenId();
		const id = sut.hash();
		expect(id).toEqual(res);
	});
});
