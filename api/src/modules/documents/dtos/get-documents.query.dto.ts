import {
	/* IsEmail, IsNotEmpty, */ IsOptional,
	IsString,
} from 'class-validator';

export class GetDocumentsQueryDto {
	// @IsNotEmpty()
	// @IsEmail()
	// email: string;

	@IsOptional()
	@IsString()
	query: string | undefined;
}
