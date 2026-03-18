import { useToast } from '../components/Toast';

function fallbackCopy(text: string) {
	const textarea = document.createElement('textarea');
	textarea.value = text;
	textarea.style.position = 'fixed';
	textarea.style.opacity = '0';
	document.body.appendChild(textarea);
	textarea.select();

	let copied = false;

	try {
		copied = document.execCommand('copy');
	} finally {
		document.body.removeChild(textarea);
	}

	return copied;
}

export function useCopyToClipboard() {
	const { showToast } = useToast();

	async function copyText(text: string, successMessage?: string) {
		try {
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(text);
				showToast(successMessage ?? `Copied "${text}"`);
				return true;
			}
		} catch {
			// Fall through to execCommand fallback.
		}

		const copied = fallbackCopy(text);
		showToast(copied ? successMessage ?? `Copied "${text}"` : 'Copy failed');
		return copied;
	}

	return { copyText };
}
