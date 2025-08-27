import BlogEditor from "../components/Blog/BlogEditor";

const Projects = () => {
	return (
		<BlogEditor
			onSave={(data) => {
				// send `data` to your API
				console.log("Blog saved:", data);
			}}
		/>
	);
};

export default Projects;
