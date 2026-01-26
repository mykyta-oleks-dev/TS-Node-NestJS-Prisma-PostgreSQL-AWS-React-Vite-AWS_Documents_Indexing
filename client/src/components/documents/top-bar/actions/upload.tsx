import { Button } from '@/components/ui/button';
import { useUploadDocument } from '@/hooks/useUploadDocument';
import { useRef, useState } from 'react';

const UploadButton = () => {
	const [inputKey, setInputKey] = useState(1);
	const fileInputRef = useRef<null | HTMLInputElement>(null);
	const upload = useUploadDocument();

	const onSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		upload.mutate(file);
		setInputKey((prev) => prev + 1);
	};

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<>
			<input
				type="file"
				accept=".pdf,.docx"
				onChange={onSelect}
				hidden
				id="upload"
				ref={fileInputRef}
				key={inputKey}
			/>
			<Button onClick={handleButtonClick}>Upload</Button>
		</>
	);
};

export default UploadButton;
