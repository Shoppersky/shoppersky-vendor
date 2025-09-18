// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
            <div className="text-center max-w-md">
                <h1 className="text-6xl font-extrabold text-gray-800 mb-4 animate-bounce">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-500 mb-8">
                    Oops! The page you are looking for does not exist or has been moved.
                </p>
                <Link
                    href="/home"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    Go Back Home
                </Link>
            </div>
            <div className="mt-12">
                {/* Optional: Add a subtle background illustration */}
                <svg
                    className="w-64 h-64 text-blue-100 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
        </main>
    );
}
