import { Injectable } from '@nestjs/common';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import { extensions } from '../../../shared/types/document.types';
import {
	PDF_DOCUMENT_TYPE,
	WORD_DOCUMENT_TYPE_DOCX,
} from '../../../shared/constants/document.constants';

@Injectable()
export class DocumentsTextService {
	public async extract(buffer: Buffer, key: string) {
		if (key.endsWith(extensions[PDF_DOCUMENT_TYPE]))
			return this.extractPdf(buffer);
		if (key.endsWith(extensions[WORD_DOCUMENT_TYPE_DOCX]))
			return this.extractDoc(buffer);
		return '';
	}

	private async extractPdf(buffer: Buffer) {
		const uint8Array = new Uint8Array(buffer);

		const data = new PDFParse(uint8Array);
		const text = await data.getText();

		return text.text;
	}

	private async extractDoc(buffer: Buffer) {
		const result = await mammoth.extractRawText({ buffer });
		return result.value;
	}
}
