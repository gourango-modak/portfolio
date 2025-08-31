import { Github, Linkedin, Mail } from "lucide-react";
import Section from "../Section";
import SectionHeader from "../Section/Header";

const Contact = ({ bgClass = "bg-gray-50" }) => (
    <Section bgClass={bgClass}>
        <SectionHeader
            title="Get In Touch"
            text="I'm currently open to new opportunities and collaborations.
                    Feel free to reach out if you have a project in mind or just
                    want to connect!"
        />
        <div className="flex gap-8 justify-center items-center">
            {/* Social Icon Button */}
            <a
                href="#"
                className="group p-3 rounded-full bg-gray-100 hover:bg-indigo-600 transition-all duration-200 flex items-center justify-center transform hover:scale-110"
            >
                <Github
                    size={28}
                    className="text-gray-900 group-hover:text-white transition-colors duration-200"
                />
            </a>

            <a
                href="#"
                className="group p-3 rounded-full bg-gray-100 hover:bg-indigo-600 transition-all duration-200 flex items-center justify-center transform hover:scale-110"
            >
                <Linkedin
                    size={28}
                    className="text-gray-900 group-hover:text-white transition-colors duration-200"
                />
            </a>

            <a
                href="#"
                className="group p-3 rounded-full bg-gray-100 hover:bg-indigo-600 transition-all duration-200 flex items-center justify-center transform hover:scale-110"
            >
                <Mail
                    size={28}
                    className="text-gray-900 group-hover:text-white transition-colors duration-200"
                />
            </a>
        </div>
    </Section>
);

export default Contact;
