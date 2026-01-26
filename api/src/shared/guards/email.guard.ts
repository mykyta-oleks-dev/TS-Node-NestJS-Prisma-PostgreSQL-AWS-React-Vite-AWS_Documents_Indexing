import {
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

export class EmailAuthGuard implements CanActivate {
	canActivate(ctx: ExecutionContext): boolean {
		const req = ctx.switchToHttp().getRequest<Request>();
		const email = req.headers['x-user-email'];

		if (!email || typeof email !== 'string') {
			throw new UnauthorizedException();
		}

		req.user = email;

		return true;
	}
}

export function UseEmailAuthGuard() {
	return UseGuards(EmailAuthGuard);
}
