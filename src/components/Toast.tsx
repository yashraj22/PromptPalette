import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ReactNode,
} from 'react';

interface ToastContextValue {
	showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [message, setMessage] = useState('Copied!');
	const [visible, setVisible] = useState(false);
	const timerRef = useRef<number | null>(null);

	const showToast = useCallback((nextMessage: string) => {
		setMessage(nextMessage);
		setVisible(true);

		if (timerRef.current !== null) {
			window.clearTimeout(timerRef.current);
		}

		timerRef.current = window.setTimeout(() => {
			setVisible(false);
			timerRef.current = null;
		}, 2000);
	}, []);

	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
			}
		};
	}, []);

	const value = useMemo(() => ({ showToast }), [showToast]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div
				className={`toast ${visible ? 'show' : ''}`}
				role="status"
				aria-live="polite">
				<svg
					width="14"
					height="14"
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round">
					<polyline points="3.5 8.5 6.5 11.5 12.5 5.5" />
				</svg>
				<span>{message}</span>
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error('useToast must be used within ToastProvider');
	}

	return context;
}

export function ToastViewport() {
	return null;
}
