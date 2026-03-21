import type { ButtonHTMLAttributes, MouseEvent } from 'react';
import { useState } from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
	label: string;
	variant?: 'default' | 'uiux';
}

export function Chip({ label, variant = 'default', className = '', onClick, ...props }: ChipProps) {
	const [copied, setCopied] = useState(false);
	const { copyText } = useCopyToClipboard();

	const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
		const success = await copyText(label);
		onClick?.(event);
		if (!success) {
			return;
		}

		setCopied(true);
		window.setTimeout(() => setCopied(false), 1200);
	};

	return (
		<button
			className={`chip${variant === 'uiux' ? ' uiux-chip' : ''}${copied ? ' copied' : ''}${className ? ` ${className}` : ''}`}
			type="button"
			onClick={(event) => void handleClick(event)}
			{...props}>
			{label}
		</button>
	);
}
