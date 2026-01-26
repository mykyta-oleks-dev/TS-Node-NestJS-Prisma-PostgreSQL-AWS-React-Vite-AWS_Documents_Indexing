import officeparser from 'officeparser';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentTextService {
	public async extract(buffer: Buffer) {
		try {
			const ast = await officeparser.parseOffice(buffer);

			const text = ast.toText();

			return text;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
}
