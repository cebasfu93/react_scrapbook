import { Link } from "react-router-dom";

const Post = ({ post }) => {
  /**
   * Component to display the previous of a single post.
   */
  return (
    <article className="post">
      <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
        <p className="postDate">{post.datetime}</p>
        {/* If the body has more than 25 characters, crop it at that. This is only the preview.  */}
        <p className="postBody">
          {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
        </p>
      </Link>
    </article>
  );
};

export default Post;
