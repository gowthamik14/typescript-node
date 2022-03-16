import { Router } from 'express';
import validationMiddleware from '@middleware/validation.middleware';
import validate from '@resources/post/post.validation';
import PostController from './post.controller';
import HttpException from '@utils/exceptions/http.exception';

const router = Router();

router.post(
    '/posts',
    validationMiddleware(validate.create),
    async (req, res, next) => {
        try {
            const controller = new PostController();
            const response = await controller.createPost(req.body);
            return res.send(response);
        } catch (Error) {
            next(new HttpException(400, 'Cannot create post'));
        }
    }
);

export default router;
