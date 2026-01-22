import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetDocumentsDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;
}
