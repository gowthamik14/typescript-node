
import PostService from '@resources/post/post.service';
import PostDoc from './post.interface';
import { Route, Tags, Post, Body, Path, Controller, Response, SuccessResponse } from 'tsoa';

@Route('posts')
@Tags('Post')
class PostController extends Controller {
    private postService = new PostService();

    @Post()
    @SuccessResponse("201", "Created")
    @Response(400, "Request nor valid")
    public async createPost(@Body() requestBody: PostDoc): Promise<PostDoc> {
        try {
            return await this.postService.create(
                requestBody.title,
                requestBody.body
            );
        } catch {
            throw new Error('Cannot create Post');
        }
    }
}

export default PostController;
