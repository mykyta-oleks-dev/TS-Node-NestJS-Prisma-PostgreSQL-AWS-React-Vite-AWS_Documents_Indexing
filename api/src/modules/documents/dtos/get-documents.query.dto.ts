import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetDocumentsQueryDto {
	@IsNotEmpty()
	@IsEmail()
	email: string;
}
