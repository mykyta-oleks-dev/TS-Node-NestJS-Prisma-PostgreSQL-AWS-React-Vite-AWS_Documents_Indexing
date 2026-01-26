import {
	IsEmail,
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsString,
	Max,
	MaxLength,
	Min,
} from 'class-validator';
import {
	type DocumentContentType,
	documentContentTypes,
} from '../../../shared/types/document.types';

export class GeneratePutUrlBodyDto {
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

	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	@Max(10 * 1024 * 1024)
	size: number;
}
