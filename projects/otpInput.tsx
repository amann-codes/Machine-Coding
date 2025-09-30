"use client";

import { useState, useRef, useEffect } from "react";

const INPUT_DIGITS = 6;

const OtpInput = () => {
    const [otp, setOtp] = useState<string[]>(new Array(INPUT_DIGITS).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value;
        if (!/^[a-zA-Z0-9]$/.test(value) && value !== "") return;
        const newOtp = [...otp];
        newOtp[index] = value.toUpperCase();
        setOtp(newOtp);
        if (value && index < INPUT_DIGITS - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData("text")
            .trim()
            .slice(0, INPUT_DIGITS);
        if (/^[a-zA-Z0-9]+$/.test(pastedData)) {
            const newOtp = [...otp];
            const pastedChars = pastedData.split("");
            pastedChars.forEach((char, i) => {
                if (i < INPUT_DIGITS) newOtp[i] = char.toUpperCase();
            });
            setOtp(newOtp);
            inputRefs.current[pastedChars.length - 1]?.focus();
        }
    };

    return (
        <div className="mx-auto max-w-3xl p-6 font-sans mt-16 md:mt-24">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">Enter Your Code</h2>
                <p className="mt-2 text-gray-500">
                    Please enter the 6-character code sent to your device.
                </p>
            </div>

            <div
                className="flex justify-center gap-3 md:gap-4 mt-8"
                onPaste={handlePaste}
            >
                {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleOnChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="
              h-16 w-12 md:h-20 md:w-16 
              text-center text-3xl font-bold text-gray-700
              bg-gray-100 border-2 border-gray-200 rounded-lg 
              transition-all duration-300
              focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200
            "
                    />
                ))}
            </div>
        </div>
    );
};

export default OtpInput;