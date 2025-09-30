"use client";

import { useState } from "react";
import { X } from "lucide-react";

const initialTags = ["React", "JavaScript", "Web Development"];

const ChipInput = () => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setTags((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
    }
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="mx-auto max-w-3xl p-6 font-sans mt-16 md:mt-24">
      <div className="text-left">
        <h2 className="text-3xl font-bold text-gray-800">Keywords</h2>
        <p className="mt-2 text-gray-500">
          Add or remove keywords to categorize your content.
        </p>
      </div>

      <div className="mt-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border-b-2 border-gray-200 bg-transparent py-3 text-xl text-gray-800 placeholder-gray-400 transition-colors duration-300 focus:border-green-500 focus:outline-none"
          placeholder="Add a keyword and press Enter..."
        />
      </div>

      <div className="mt-4 flex min-h-[40px] flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5"
          >
            <span className="text-base font-medium text-gray-700">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-gray-500 transition-colors hover:text-gray-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChipInput;