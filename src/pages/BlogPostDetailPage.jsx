import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Common/Breadcrumb";
import BlogPostRenderer from "../components/blog/BlogPostRenderer";
import { fetchPosts } from "../data/posts";
import DataLoader from "../components/Common/DataLoader";
import { formatDate } from "../utils/date";
import PostHeader from "../components/blog/PostHeader";

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
                    <section className="pt-30 min-h-screen bg-gray-50/50">
                        <div className="container mx-auto px-6 md:px-12 md:max-w-4xl pb-24">
                            <div className="">
                                <Breadcrumb crumbs={crumbs} />
                            </div>
                            <PostHeader
                                title={post.title}
                                date={formatDate(post.createdAt)}
                            />
                            <div className="prose md:prose-lg max-w-none">
                                <BlogPostRenderer content={post.content} />
                            </div>
                        </div>
                    </section>
                );
            }}
        />
    );
};

export default BlogPostDetailPage;
