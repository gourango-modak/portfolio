import { useParams } from "react-router-dom";
import DataLoader from "../../components/Common/DataLoader";
import { Breadcrumb } from "../../components/Common/Breadcrumb";
import PostDetailPageHeader from "./PostDetailPageHeader";
import { fetchPosts } from "../../data/posts";
import EditorJsContentRenderer from "./../../components/EditorJs/EditorJsContentRenderer";
import { extractHeadings } from "../../utils/editor";
import TableOfContents from "../../components/TOC/TableOfContents";

const PostDetailPage = () => {
    const { slug } = useParams();

    return (
        <section className="pt-30 min-h-screen pb-20 bg-gray-50/50">
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
                        <div className="container mx-auto px-6 md:px-12 md:max-w-6xl lg:flex lg:gap-12">
                            {/* Left Column: TOC (fixed inside this space) */}
                            <div className="w-64 hidden lg:block">
                                <TableOfContents
                                    headings={extractHeadings(post.content)}
                                />
                            </div>

                            {/* Right Column: Blog Content */}
                            <div className="lg:flex-1 lg:min-w-0">
                                <Breadcrumb crumbs={crumbs} />
                                <PostDetailPageHeader post={post} />
                                <EditorJsContentRenderer
                                    content={post.content}
                                />
                            </div>
                        </div>
                    );
                }}
            />
        </section>
    );
};

export default PostDetailPage;
