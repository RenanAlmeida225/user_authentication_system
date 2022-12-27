import { VerifyTokenMiddleware } from '../../presentation/middleware/verifyTokenMiddleware';
import { TokenJwt } from '../../util/helper';

export function makeVerifyTokenMiddleware() {
	return new VerifyTokenMiddleware(new TokenJwt());
}
