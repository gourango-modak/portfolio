import { Github, Linkedin, Mail } from "lucide-react";
import Section from "../section/Section";
import SectionHeader from "../section/SectionHeader";

const Contact = ({ bgClass = "bg-gray-100" }) => (
    <Section bgClass={bgClass}>
        <SectionHeader
            title="Let's Connect"
            text="I'm currently open to new opportunities and collaborations. Drop me a message or connect through social platforms!"
        />

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <a
                href="#"
                className="flex items-center gap-4 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
            >
                <Github size={32} className="text-gray-900" />
                <span className="font-medium text-gray-800">GitHub</span>
            </a>

            <a
                href="#"
                className="flex items-center gap-4 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
            >
                <Linkedin size={32} className="text-blue-600" />
                <span className="font-medium text-gray-800">LinkedIn</span>
            </a>

            <a
                href="#"
                className="flex items-center gap-4 p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
            >
                <Mail size={32} className="text-red-500" />
                <span className="font-medium text-gray-800">Email Me</span>
            </a>
        </div>
    </Section>
);

export default Contact;
