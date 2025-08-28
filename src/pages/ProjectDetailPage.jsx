import { useParams } from "react-router-dom";
import { fetchAllProjects } from "../data/projects";
import { ProjectDetail } from "../components/Project/ProjectDetail";
import DataLoader from "../components/Common/DataLoader";

const ProjectDetailPage = () => {
	const { id } = useParams();

	return (
		<section className="pt-24 pb-20 min-h-screen bg-gray-50">
			<div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
				<DataLoader
					fetchData={fetchAllProjects}
					render={(projects) => (
						<ProjectDetail
							project={projects.find(
								(p) => p.id === parseInt(id)
							)}
						/>
					)}
				/>
			</div>
		</section>
	);
};

export default ProjectDetailPage;
