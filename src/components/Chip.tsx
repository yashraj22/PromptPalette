import { useState } from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

interface ChipProps {
	label: string;
	variant?: 'default' | 'uiux';
}

export function Chip({ label, variant = 'default' }: ChipProps) {
	const [copied, setCopied] = useState(false);
	const { copyText } = useCopyToClipboard();

	const handleClick = async () => {
		const success = await copyText(label);
		if (!success) {
			return;
		}

		setCopied(true);
		window.setTimeout(() => setCopied(false), 1200);
	};

	return (
		<button
			className={`chip${variant === 'uiux' ? ' uiux-chip' : ''}${copied ? ' copied' : ''}`}
			type="button"
			onClick={() => void handleClick()}>
			{label}
		</button>
	);
}
