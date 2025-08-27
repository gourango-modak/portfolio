import Blog from "../components/Home/Blog/Blog";
import Header from "../components/Home/Header/Header";
import Project from "../components/Home/Project/Project";
import Skill from "../components/Home/Skill/Skill";

const Home = () => {
	return (
		<>
			<Header />
			<Project />
			<Skill />
			<Blog />
		</>
	);
};

export default Home;
