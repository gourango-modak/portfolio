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
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold mb-2 text-slate-900">
                                {post.title}
                            </h1>
                            <p className="text-sm text-slate-500 mb-1">
                                {formatDate(post.createdAt)}
                            </p>
                        </div>
                        <BlogPostRenderer content={post.content} />
                    </div>
                );
            }}
        />
    );
};

export default BlogPostDetailPage;
