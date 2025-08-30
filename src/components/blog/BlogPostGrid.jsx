import BlogPostCard from "./BlogPostCard";

const BlogPostGrid = ({ posts }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
        ))}
    </div>
);

export default BlogPostGrid;
