import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Common/Breadcrumb";
import BlogPostRenderer from "../components/blog/BlogPostRenderer";
import { fetchPosts } from "../data/posts";
import DataLoader from "../components/Common/DataLoader";
import { formatDate } from "../utils/date";

const BlogPostDetailPage = () => {
    const { id } = useParams();

    return (
        <DataLoader
            fetchData={fetchPosts}
            render={(posts) => {
                const post = posts.find((p) => p.id === parseInt(id));
                const crumbs = [
                    { to: "/", label: "Home" },
                    { to: "/Blog", label: "Blog" },
                    { label: post.title },
                ];

                return (
                    <div className="pt-24 min-h-screen container mx-auto px-6 md:px-12 md:max-w-6xl mb-24">
                        <div className="mb-8">
                            <Breadcrumb crumbs={crumbs} />
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-0">
                            {post.title}
                        </h1>
                        <p className="text-lg text-slate-500 mt-3">
                            {formatDate(post.createdAt)}
                        </p>
                        <div className="prose md:prose-lg lg:prose-xl max-w-none mt-8">
                            <BlogPostRenderer content={post.content} />
                        </div>
                    </div>
                );
            }}
        />
    );
};

export default BlogPostDetailPage;
