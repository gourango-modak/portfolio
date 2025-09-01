import { useParams } from "react-router-dom";
import DataLoader from "../../components/Common/DataLoader";
import { Breadcrumb } from "./../../components/Common/Breadcrumb";
import PostDetailPageHeader from "./Header";
import EditorJsContentRenderer from "./../../components/EditorJs/ContentRenderer";
import { fetchPosts } from "../../data/posts";
import { formatDate } from "../../utils/date";

const PostDetailPage = () => {
    const { slug } = useParams();

    return (
        <DataLoader
            fetchData={fetchPosts}
            render={(posts) => {
                const post = posts.find((p) => p.slug === slug);
                const crumbs = [
                    { to: "/", label: "Home" },
                    { to: "/Blog", label: "Blog" },
                    { label: post.title },
                ];

                return (
                    <section className="pt-30 min-h-screen bg-gray-50/50">
                        <div className="container mx-auto px-6 md:px-12 md:max-w-4xl pb-24">
                            <Breadcrumb crumbs={crumbs} />
                            <PostDetailPageHeader
                                title={post.title}
                                date={formatDate(post.createdAt)}
                            />
                            <EditorJsContentRenderer content={post.content} />
                        </div>
                    </section>
                );
            }}
        />
    );
};

export default PostDetailPage;
