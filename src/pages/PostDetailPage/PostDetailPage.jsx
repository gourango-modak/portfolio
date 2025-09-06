import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import PostDetailPageHeader from "./PostDetailPageHeader";
import { fetchPostBySlug } from "../../data/posts";
import EditorJsContentRenderer from "./../../components/editorJs/EditorJsContentRenderer";
import TableOfContents from "../../components/tableOfContents/TableOfContents";
import { extractHeadings } from "../../components/editorJs/editorJsUtils";
import ResourceLoader from "../../components/common/ResourceLoader";
import { truncateBreadcrumb } from "../../utils/common";

const PostDetailPage = () => {
    const { slug } = useParams();

    return (
        <section className="pt-30 min-h-screen pb-20 bg-gray-50/50">
            <ResourceLoader id={slug} fetchFn={fetchPostBySlug}>
                {(post) => {
                    const crumbs = [
                        { to: "/", label: "Home" },
                        { to: "/Blog", label: "Blog" },
                        { label: truncateBreadcrumb(post.title) },
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
            </ResourceLoader>
        </section>
    );
};

export default PostDetailPage;
