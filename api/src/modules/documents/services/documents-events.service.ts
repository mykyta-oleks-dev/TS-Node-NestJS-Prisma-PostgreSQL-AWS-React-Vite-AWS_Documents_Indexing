import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Status } from '../../../generated/prisma/enums';

export interface DocumentStatusEvent {
	id: string;
	email: string;
	status: Status;
}

@Injectable()
export class DocumentsEventsService {
	private readonly subject: Subject<DocumentStatusEvent>;

	constructor() {
		this.subject = new Subject<DocumentStatusEvent>();
	}

	emit(event: DocumentStatusEvent) {
		this.subject.next(event);
	}

	asObservable() {
		return this.subject.asObservable();
	}
}
