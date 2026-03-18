import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

class MockIntersectionObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

Object.defineProperty(window, 'scrollTo', {
	writable: true,
	value: vi.fn(),
});

Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	value: MockIntersectionObserver,
});

Object.defineProperty(window, 'isSecureContext', {
	writable: true,
	value: true,
});
