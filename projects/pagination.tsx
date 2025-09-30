"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
}

const PAGE_SIZE = 6;


const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
        return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
        return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
};

const Pagination = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://dummyjson.com/products?limit=100");
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const totalPages = Math.ceil(products.length / PAGE_SIZE);
    const paginationRange = useMemo(() => generatePagination(page, totalPages), [page, totalPages]);

    const currentProducts = useMemo(() => {
        const startIndex = (page - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return products.slice(startIndex, endIndex);
    }, [page, products]);

    const handlePageChange = (newPage: number) => {
        window.scrollTo(0, 0);
        setPage(newPage);
    };

    return (
        <div className="mx-auto max-w-6xl p-6 font-sans mt-16 md:mt-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
                <p className="mt-2 text-gray-500">
                    Browse our curated collection of high-quality items.
                </p>
            </div>

            {loading ? (
                <ProductGridSkeleton />
            ) : products.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        {paginationRange.map((item, index) =>
                            typeof item === "string" ? (
                                <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                            ) : (
                                <button
                                    key={item}
                                    onClick={() => handlePageChange(item)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-md text-base font-medium transition-colors ${page === item
                                        ? "bg-green-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {item}
                                </button>
                            )
                        )}
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center mt-16 text-gray-500">
                    <h3 className="text-xl">No products found.</h3>
                </div>
            )}
        </div>
    );
};


const ProductCard = ({ product }: { product: Product }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <div className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg">
            <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100">
                {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
                    </div>
                )}
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className={`h-full w-full object-cover object-center transition-opacity duration-300 group-hover:scale-105 ${isImageLoading ? "opacity-0" : "opacity-100"
                        }`}
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => setIsImageLoading(false)}
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <p className="mt-4 text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};



const ProductGridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(PAGE_SIZE)].map((_, index) => (
            <div key={index} className="rounded-lg border border-gray-200 bg-white">
                <div className="h-64 w-full bg-gray-100 animate-pulse rounded-t-lg" />
                <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
                    <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse mt-4" />
                </div>
            </div>
        ))}
    </div>
);

export default Pagination;