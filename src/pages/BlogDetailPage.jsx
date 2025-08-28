import { useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Common/Breadcrumb";
import { BlogRenderer } from "../components/Blog/BlogRenderer";
import { fetchAllBlogs } from "../data/blogs";
import DataLoader from "../components/Common/DataLoader";

const BlogDetailPage = () => {
	const { id } = useParams();

	return (
		<DataLoader
			fetchData={fetchAllBlogs}
			render={(blogs) => {
				const blog = blogs.find((p) => p.id === parseInt(id));
				const crumbs = [
					{ to: "/", label: "Home" },
					{ to: "/Blog", label: "Blog" },
					{ label: blog.title },
				];

				return (
					<div className="pt-24 min-h-screen container mx-auto px-6 md:px-12 md:max-w-6xl">
						<div className="mb-8">
							<Breadcrumb crumbs={crumbs} />
						</div>
						<BlogRenderer content={blog.content} />
					</div>
				);
			}}
		/>
	);
};

export default BlogDetailPage;
