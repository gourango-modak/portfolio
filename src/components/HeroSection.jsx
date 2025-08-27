// The Hero Section Component
const HeroSection = () => {
	return (
		// The main container for the hero section.
		// It uses flexbox to center content and sets a minimum height to fill the viewport.
		// Padding is added for spacing on different screen sizes.
		<section className="min-h-screen flex items-center bg-gray-50">
			<div className="container">
				{/* Grid layout for the two columns. It stacks on mobile and becomes a two-column grid on medium screens and up. */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					{/* Left Column: Text Content */}
					<div className="text-center md:text-left">
						<h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
							Gourango Modak{" "}
							<span className="inline-block animate-wave">
								👋
							</span>
						</h1>
						<p className="text-lg md:text-xl text-indigo-600 font-semibold mb-6">
							Senior Software Engineer at Enosis Solutions
						</p>
						<p className="text-base text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
							I have 4 years of experience in .NET technologies,
							building scalable and robust applications.
						</p>

						{/* Call-to-action buttons container */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
							<a
								href="#projects"
								className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
							>
								View My Work
							</a>
							<a
								href="#contact"
								className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg border-2 border-indigo-200 hover:bg-indigo-50 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
							>
								Get in Touch
							</a>
						</div>
					</div>

					{/* Right Column: Image */}
					<div className="flex justify-center md:justify-end">
						<div className="relative w-80 h-80 md:w-96 md:h-96">
							{/* Decorative background shape */}
							<div className="absolute inset-0 bg-indigo-200 rounded-full transform -rotate-12"></div>
							{/* Profile Image */}
							<img
								src="https://placehold.co/400x400/6366f1/ffffff?text=GM"
								alt="Gourango Modak's professional portrait"
								className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
								onError={(e) => {
									e.target.onerror = null;
									e.target.src =
										"https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found";
								}}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* Basic keyframes for the wave animation, using a standard style tag */}
			<style>{`
        @keyframes wave-animation {
            0% { transform: rotate( 0.0deg) }
           10% { transform: rotate(14.0deg) }
           20% { transform: rotate(-8.0deg) }
           30% { transform: rotate(14.0deg) }
           40% { transform: rotate(-4.0deg) }
           50% { transform: rotate(10.0deg) }
           60% { transform: rotate( 0.0deg) }
          100% { transform: rotate( 0.0deg) }
        }
        .animate-wave {
          animation: wave-animation 2.5s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
      `}</style>
		</section>
	);
};

export default HeroSection;
