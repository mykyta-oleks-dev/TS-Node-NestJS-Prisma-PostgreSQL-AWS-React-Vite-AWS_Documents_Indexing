import { IsOptional, IsString } from 'class-validator';

export class GetDocumentsQueryDto {
	@IsOptional()
	@IsString()
	query: string | undefined;
}
