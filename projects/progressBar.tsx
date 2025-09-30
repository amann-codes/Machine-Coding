"use client";

import { useState, useEffect } from "react";

const ProgressbarApp = () => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mx-auto max-w-3xl p-6 font-sans mt-16 md:mt-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">Task Progress</h2>
                <p className="mt-2 text-gray-500">
                    This progress bar updates automatically every second to simulate a running process.
                </p>
            </div>

            <div
                className="relative h-8 w-full bg-gray-200 rounded-full"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className="font-semibold transition-colors duration-300"
                        style={{ color: progress > 50 ? 'white' : 'rgb(55 65 81)' }}
                    >
                        {progress}% Complete
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProgressbarApp;