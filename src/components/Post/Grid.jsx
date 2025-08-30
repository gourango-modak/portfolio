import PostCard from "./Card";

const PostGrid = ({ posts }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {posts.map((post) => (
            <PostCard key={post.id} post={post} />
        ))}
    </div>
);

export default PostGrid;
