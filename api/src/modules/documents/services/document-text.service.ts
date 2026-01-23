import { PDFParse } from 'pdf-parse';
// import mammoth from 'mammoth';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentTextService {
	public async extractFromPdf(buffer: Buffer) {
		return (await new PDFParse({ data: buffer }).getText({})).text;
	}
}
