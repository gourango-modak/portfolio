export const projectsData = [
	{
		id: 1,
		title: "E-Commerce Platform",
		description:
			"A scalable e-commerce solution with a .NET Core backend, featuring payment gateway integration and inventory management.",
		tags: [".NET Core", "React", "SQL Server", "Stripe API"],
		image: "https://placehold.co/1200x800/6366f1/ffffff?text=E-Commerce+Platform",
		liveUrl: "#",
		repoUrl: "#",
		problem:
			"The client needed a modern, high-performance online store to replace their outdated system, which was slow, difficult to manage, and not mobile-friendly.",
		solution:
			"I led the development of a full-stack e-commerce platform using .NET Core for the backend API and React for the frontend. The solution included a secure payment gateway with Stripe, a real-time inventory management system, and a responsive user interface that works flawlessly on all devices.",
		features: [
			"Secure user authentication and authorization",
			"Real-time product inventory tracking",
			"Stripe integration for credit card payments",
			"Admin dashboard for managing products and orders",
		],
	},
	{
		id: 2,
		title: "Real-Time Analytics Dashboard",
		description:
			"A dashboard application for visualizing live data streams using SignalR and modern frontend frameworks.",
		tags: ["SignalR", "Angular", "Azure", "Cosmos DB"],
		image: "https://placehold.co/1200x800/10b981/ffffff?text=Analytics+Dashboard",
		liveUrl: "#",
		repoUrl: "#",
		problem:
			"A financial services company required a way to monitor market data in real-time to make informed trading decisions, but their existing tools had significant latency.",
		solution:
			"I engineered a real-time dashboard using ASP.NET Core SignalR to push live data from the server to an Angular frontend. The application was deployed on Azure and utilized Cosmos DB for high-throughput data storage, reducing data latency by over 95%.",
		features: [
			"Live data visualization with charts and graphs",
			"Customizable alert notifications",
			"Low-latency data updates via WebSockets",
			"Scalable cloud architecture on Azure",
		],
	},
	{
		id: 3,
		title: "Enterprise CRM System",
		description:
			"A custom CRM built to streamline customer interactions and sales pipelines for a large organization.",
		tags: ["ASP.NET MVC", "Entity Framework", "REST API", "jQuery"],
		image: "https://placehold.co/1200x800/f59e0b/ffffff?text=CRM+System",
		liveUrl: "#",
		repoUrl: "#",
		problem:
			"The sales team was struggling with a generic, off-the-shelf CRM that didn't fit their unique workflow, leading to inefficiencies and lost data.",
		solution:
			"I developed a bespoke CRM system from the ground up using ASP.NET MVC and Entity Framework. The application was tailored to the company's specific sales pipeline, featuring custom reporting tools and a REST API for integration with other internal systems.",
		features: [
			"Custom sales pipeline management",
			"Automated reporting and analytics",
			"Contact and lead management modules",
			"Integration with internal company software",
		],
	},
];
