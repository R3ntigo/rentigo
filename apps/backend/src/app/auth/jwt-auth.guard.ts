import { CanActivate, ExecutionContext, Injectable, Logger, MethodNotAllowedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
	private readonly logger: Logger;

	private allowedMethods = ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'];

	constructor() {
		super();
		this.logger = new Logger('JwtAuthGuard', { timestamp: true });
	}  

	canActivate(context: ExecutionContext) {
		const request: Request = context.switchToHttp().getRequest();
		this.logger.debug(`Request method: ${request.method}`);
		if (!this.allowedMethods.includes(request.method)) {
			throw new MethodNotAllowedException();
		}
		return super.canActivate(context);
	}
}
