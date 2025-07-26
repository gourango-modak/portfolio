// ProfileCard.jsx
const ProfileCard = () => {
	return (
		<div className="relative flex justify-center items-center mt-20 px-4">
			{/* Background Box */}
			<div className="w-full max-w-md bg-white dark:bg-neutral-900 shadow-lg rounded-xl p-6 pt-16 text-center">
				<h2 className="text-2xl font-bold text-black dark:text-white">
					Abhinay
				</h2>
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					Sr. Frontend Engineer
				</p>
				<p className="mt-2 text-neutral-700 dark:text-neutral-300 text-sm">
					Building high-performance, user-friendly web apps with a
					love for clean design.
				</p>
			</div>

			{/* Image positioned on top */}
			<div className="absolute -top-12">
				<img
					src="/profile.jpg" // Replace with your image path
					alt="Profile"
					className="w-24 h-24 rounded-full border-4 border-white dark:border-neutral-900 shadow-md object-cover"
				/>
			</div>
		</div>
	);
};

export default ProfileCard;
