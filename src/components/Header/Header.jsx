import profile from "../../assets/profile_3.png";
import SocialButtons from "./SocialButtons";

const Header = () => {
	return (
		<section className="py-24 text-black dark:text-white">
			<div className="flex gap-10">
				{/* Design with header content with image */}
				<div className="w-2/4 mx-auto text-left">
					<h1 className="text-xl sm:text-2xl mb-2 text-neutral-600 dark:text-neutral-400">
						Hello,
					</h1>
					<h2 className="text-4xl sm:text-5xl font-bold mb-4">
						I&apos;m Gourango.
					</h2>
					<h3 className="text-lg sm:text-xl font-semibold mb-6 text-neutral-600 dark:text-neutral-400">
						Sr. Frontend Engineer
					</h3>
					<p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-2xl">
						I'm a Senior Frontend Engineer passionate about crafting
						web applications that excel in both speed and design. I
						utilize the latest technologies and prioritize a
						user-centric approach to build scalable, responsive, and
						secure frontend architectures for businesses. I'm a
						Senior Frontend Engineer passionate about crafting web
						applications that excel in both speed and design. I
						utilize the latest technologies and prioritize a
						user-centric approach to build scalable, responsive, and
						secure frontend architectures for businesses.
					</p>
				</div>
				{/* Profile Image */}
				<div className="w-2/4 flex justify-center items-center">
					<img
						src={profile}
						alt="Profile"
						className="w-46 h-46 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-neutral-300 dark:border-neutral-700 shadow-md"
					/>
				</div>
			</div>
			<SocialButtons />
		</section>
	);
};

export default Header;
