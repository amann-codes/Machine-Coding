"use client";

import { useState, ReactNode } from "react";
import { User, Settings, Heart, Sun, Moon, Monitor } from "lucide-react";

interface FormData {
    name: string;
    age: number | "";
    email: string;
    theme: "light" | "dark" | "system";
    interests: string[];
}

const FormField = ({ label, id, ...props }: { label: string; id: string;[key: string]: any }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">
            {label}
        </label>
        <input
            id={id}
            {...props}
            className="w-full border-b-2 border-gray-200 bg-transparent py-2 text-lg text-gray-800 placeholder-gray-400 transition-colors duration-300 focus:border-green-500 focus:outline-none"
        />
    </div>
);

const ThemeOption = ({ value, label, icon, currentTheme, onChange }: { value: FormData['theme'], label: string, icon: ReactNode, currentTheme: FormData['theme'], onChange: (v: FormData['theme']) => void }) => (
    <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${currentTheme === value ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
        <input type="radio" name="theme" value={value} checked={currentTheme === value} onChange={() => onChange(value)} className="hidden" />
        <div className={`p-2 rounded-full ${currentTheme === value ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
            {icon}
        </div>
        <div>
            <span className="font-semibold text-gray-800">{label}</span>
        </div>
    </label>
);

const InterestCheckbox = ({ label, isChecked, onChange }: { label: string, isChecked: boolean, onChange: () => void }) => (
    <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${isChecked ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
        <input type="checkbox" checked={isChecked} onChange={onChange} className="h-5 w-5 accent-green-600" />
        <span className="font-medium text-gray-700">{label}</span>
    </label>
);


const TabForm = () => {
    const [data, setData] = useState<FormData>({
        name: "John Doe",
        age: 21,
        email: "john.doe@gmail.com",
        theme: "light",
        interests: ["Web Development", "UI/UX Design"],
    });
    const [activeTab, setActiveTab] = useState<number>(0);

    const allInterests = ["Web Development", "UI/UX Design", "Machine Learning", "Photography", "Traveling"];

    const handleChange = (value: string | number, field: keyof FormData) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const handleInterestToggle = (interest: string) => {
        setData((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((item) => item !== interest)
                : [...prev.interests, interest],
        }));
    };

    const tabs = [
        { name: "Account", icon: <User /> },
        { name: "Preferences", icon: <Settings /> },
        { name: "Interests", icon: <Heart /> },
    ];

    return (
        <div className="mx-auto max-w-3xl p-6 font-sans mt-16 md:mt-24">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">User Settings</h2>
                <p className="mt-2 text-gray-500">
                    Manage your account details and application preferences.
                </p>
            </div>

            <div className="flex justify-center p-1 bg-gray-100 rounded-lg mb-8">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-base font-semibold rounded-md transition-colors ${activeTab === index
                            ? "bg-white text-green-600 shadow-sm"
                            : "text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {tab.icon} {tab.name}
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {activeTab === 0 && ( // Account Tab
                    <div className="space-y-6">
                        <FormField label="Name" id="name" type="text" value={data.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, "name")} />
                        <FormField label="Email" id="email" type="email" value={data.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, "email")} />
                        <FormField label="Age" id="age" type="number" value={data.age} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value ? parseInt(e.target.value) : "", "age")} />
                    </div>
                )}

                {activeTab === 1 && ( // Preferences Tab
                    <div className="space-y-4">
                        <ThemeOption value="light" label="Light Mode" icon={<Sun />} currentTheme={data.theme} onChange={(v) => setData(p => ({ ...p, theme: v }))} />
                        <ThemeOption value="dark" label="Dark Mode" icon={<Moon />} currentTheme={data.theme} onChange={(v) => setData(p => ({ ...p, theme: v }))} />
                        <ThemeOption value="system" label="System Default" icon={<Monitor />} currentTheme={data.theme} onChange={(v) => setData(p => ({ ...p, theme: v }))} />
                    </div>
                )}

                {activeTab === 2 && ( // Interests Tab
                    <div className="grid grid-cols-2 gap-4">
                        {allInterests.map(interest => (
                            <InterestCheckbox key={interest} label={interest} isChecked={data.interests.includes(interest)} onChange={() => handleInterestToggle(interest)} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabForm;