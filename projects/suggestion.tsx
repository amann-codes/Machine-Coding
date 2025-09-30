"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpLeft, Search, ChevronLeft } from "lucide-react";

interface Item {
    id: string;
    name: string;
    instructions: string[];
    ingredients: string[];
}

const Recipe = () => {
    const [keyword, setKeyword] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Item[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [cache, setCache] = useState<{ [key: string]: Item[] }>({});
    const [recipe, setRecipe] = useState<Item | null>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const getSuggestions = async (searchTerm: string) => {
        if (!searchTerm) {
            setSuggestions([]);
            return;
        }
        if (cache[searchTerm]) setSuggestions(cache[searchTerm]);
        else {
            try {
                const res = await fetch(
                    `https://dummyjson.com/recipes/search?q=${searchTerm}`
                );
                const data = await res.json();
                const recipes: Item[] = data?.recipes || [];
                setSuggestions(recipes);
                setCache((prev) => ({ ...prev, [searchTerm]: recipes }));
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => getSuggestions(keyword), 300);
        return () => clearTimeout(timer);
    }, [keyword, cache]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSuggestionClick = (item: Item) => {
        setRecipe(item);
        setKeyword("");
        setSuggestions([]);
        setShowResults(false);
    };

    const handleArrowClick = (item: Item) => {
        setKeyword(item.name);
        setShowResults(true);
    };

    if (recipe) {
        return (
            <div className="mx-auto max-w-3xl p-6 font-sans mt-16 md:mt-24 animate-fade-in">
                <button
                    onClick={() => setRecipe(null)}
                    className="flex items-center gap-2 text-lg font-semibold text-gray-500 transition-colors hover:text-gray-800 mb-8"
                >
                    <ChevronLeft className="w-6 h-6" />
                    Back to Search
                </button>
                <h1 className="text-5xl font-bold text-gray-800 mb-6">{recipe.name}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-3 border-b pb-2">
                            Ingredients
                        </h2>
                        <ul className="space-y-2 text-gray-600 list-disc list-inside">
                            {recipe.ingredients?.map((ing, index) => (
                                <li key={index}>{ing}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-3 border-b pb-2">
                            Instructions
                        </h2>
                        <ol className="space-y-4 text-gray-600 list-decimal list-inside">
                            {recipe.instructions?.map((inst, index) => (
                                <li key={index}>{inst}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl p-6 font-sans mt-16 md:mt-24">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Recipe Finder</h2>
                <p className="mt-2 text-gray-500">
                    Find your next favorite meal by name.
                </p>
            </div>
            <div className="relative" ref={searchContainerRef}>
                <div className="flex items-center gap-4 border-b-2 border-gray-200 py-3 transition-colors duration-300 focus-within:border-green-500">
                    <Search className="w-6 h-6 text-gray-400" />
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={() => setShowResults(true)}
                        className="flex-1 appearance-none border-none bg-transparent text-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0"
                        placeholder="Search for pasta, chicken, etc..."
                    />
                </div>
                {showResults && suggestions.length > 0 && (
                    <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-80 overflow-y-auto">
                        {suggestions.map((item) => (
                            <div
                                key={item.id}
                                onMouseDown={() => handleSuggestionClick(item)}
                                className="group flex cursor-pointer items-center justify-between p-4 text-lg text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                <span>{item.name}</span>
                                <button
                                    onMouseDown={(e) => {
                                        e.stopPropagation();
                                        handleArrowClick(item);
                                    }}
                                    className="opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <ArrowUpLeft className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recipe;