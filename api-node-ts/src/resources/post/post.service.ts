import PostModel  from "./post.model";
import Post from '@resources/post/post.interface';

class PostService {
  

    /**
     *  Create a new post
     */

    public async create(title :string , body : string) : Promise<Post> {
        try{
//this create is from mongo db document
            const post = PostModel.create({title,body})
            return post;
        }
        catch(error)
        {
            throw new Error("Unable to create post");
        }
    }
}

export default PostService;