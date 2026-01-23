import {
	IsEmail,
	IsIn,
	IsNotEmpty,
	IsString,
	MaxLength,
} from 'class-validator';
import {
	type DocumentContentType,
	documentContentTypes,
} from '../../../shared/types/document.types';

export class GetPutPresignedUrlBodyDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(200)
	filename: string;

	@IsNotEmpty()
	@MaxLength(100)
	@IsIn(documentContentTypes)
	contentType: DocumentContentType;

	@IsNotEmpty()
	@IsEmail()
	email: string;
}
