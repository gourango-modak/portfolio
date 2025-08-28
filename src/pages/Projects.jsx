import ProjectCard from "../components/Home/project/ProjectCard";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import ProjectModal from "../components/Project/ProjectModal";
import DataLoader from "../components/common/DataLoader";
import { fetchAllProjects } from "../data/projects";
import { ISDEVENV } from "../config/config";

const Projects = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="pt-24 pb-20 min-h-screen bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                        <h1 className="text-4xl font-bold text-slate-900">
                            Portfolio
                        </h1>
                        <div className={ISDEVENV ? "" : "hidden"}>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                            >
                                <PlusCircle size={20} /> Add
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                        Explore a curated selection of my projects. Each one
                        represents a unique challenge and a step forward in my
                        journey as a developer.
                    </p>
                    <DataLoader
                        fetchData={fetchAllProjects}
                        render={(projects) => (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                    />
                                ))}
                            </div>
                        )}
                    />
                </div>
            </section>
            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Projects;
