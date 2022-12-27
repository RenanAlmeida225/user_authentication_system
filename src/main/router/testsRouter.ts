import { Router } from 'express';
import { adaptMiddleware } from '../adapt/expessAdaptMiddleware';
import { makeVerifyTokenMiddleware } from '../factory/makeVerifyTokenMiddleware';

const router = Router();

router.get('/', adaptMiddleware(makeVerifyTokenMiddleware()), (req, res) => {
	const posts = {
		post1: { id: 1, content: 'dafçkjdafçldkmfdç' },
		post2: { id: 2, content: 'dafçkjdafçldkmfdç' },
		post3: { id: 3, content: 'dafçkjdafçldkmfdç' },
		post4: { id: 4, content: 'dafçkjdafçldkmfdç' }
	};
	res.status(200).json(posts);
});

export default router;
