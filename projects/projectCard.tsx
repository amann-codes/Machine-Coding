"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
    index: number;
    title: string;
    route: string;
}

const ProjectCard = ({ index, title, route }: ProjectCardProps) => {
    return (
        <a href={route} target="_blank" rel="noopener noreferrer" className="block group">
            <motion.div
                className="relative h-64 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
            >
                <p className="absolute -right-4 -bottom-4 text-8xl font-black text-gray-300 z-0">
                    #{index + 1}
                </p>

                {/* Card Content */}
                <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex justify-end">
                        <ArrowUpRight className="h-6 w-6 text-gray-300 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                </div>
            </motion.div>
        </a>
    );
};

export default ProjectCard;