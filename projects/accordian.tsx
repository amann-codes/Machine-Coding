"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const accordionData = [
    {
        title: "What is React?",
        data: "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.",
    },
    {
        title: "How does state management work?",
        data: "State in React is any data that should be saved and modified without necessarily being added to a database. It allows you to create components that are dynamic and interactive.",
    },
    {
        title: "What are React Hooks?",
        data: "Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes.",
    },
    {
        title: "Can I use this with TypeScript?",
        data: "Yes, React has excellent support for TypeScript. Using TypeScript with React allows you to add static types to your components, improving code quality and maintainability.",
    },
];

interface AccordionItemProps {
    title: string;
    data: string;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, data, isOpen, onClick }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="border-b border-gray-200">
            <button
                className="flex w-full items-center justify-between p-5 text-left hover:bg-gray-50 focus:outline-none"
                onClick={onClick}
            >
                <span className="text-lg font-semibold text-gray-700">{title}</span>
                <ChevronDown
                    className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px" }}
                className="overflow-hidden transition-all duration-500 ease-in-out"
            >
                <div className="p-5 pt-0 text-base text-gray-600">
                    {data}
                </div>
            </div>
        </div>
    );
};

const AccordionApp = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleItemClick = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <div className="mx-auto max-w-3xl p-6 font-sans mt-16 md:mt-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
                <p className="mt-2 text-gray-500">
                    Find answers to common questions about our platform.
                </p>
            </div>

            <div className="rounded-lg border border-gray-200">
                {accordionData.map((item, index) => (
                    <AccordionItem
                        key={index}
                        title={item.title}
                        data={item.data}
                        isOpen={openIndex === index}
                        onClick={() => handleItemClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AccordionApp;