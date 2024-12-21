"use client"
// import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'

export default function Navbar() {
    const { data: session } = useSession()
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        if (typeof window !== "undefined") {
            const html = document.documentElement;
            if (html.classList.contains("dark")) {
                html.classList.remove("dark");
                localStorage.setItem("theme", "light");
            } else {
                html.classList.add("dark");
                localStorage.setItem("theme", "dark");
            }
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark") {
                setIsDarkMode(true);
                document.documentElement.classList.add("dark");
            } else {
                setIsDarkMode(false);
                document.documentElement.classList.remove("dark");
            }
        }
    }, []);

    return (
        <header className="sticky top-0 w-full flex items-center h-20 border-b border-b-gray-100 dark:border-b-gray-900 z-40 bg-white/80 dark:bg-gray-950 backdrop-filter backdrop-blur-xl">
            <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5">
                <nav className="w-full flex justify-between gap-6 relative">
                    <div className="min-w-max inline-flex relative">
                        <Link href="/" className="relative flex items-center gap-3">
                            <div className="inline-flex text-lg font-semibold text-gray-900 dark:text-white">
                                WeerawitPM
                            </div>
                        </Link>
                    </div>
                    <div className="min-w-max flex items-center gap-x-3">
                        <button
                            onClick={toggleTheme}
                            className="outline-none flex relative text-gray-700 dark:text-gray-300 rounded-full p-2 lg:p-3 border border-gray-100 dark:border-gray-900"
                        >
                            {isDarkMode ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                                    />
                                </svg>
                            )}
                        </button>
                        {session ? (
                            <div className="flex items-center gap-3">
                                {session.user.image && (
                                    <Image
                                        src={session.user.image}
                                        alt="User Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full border border-gray-100 dark:border-gray-800"
                                    />
                                )}
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm text-gray-700 dark:text-gray-300"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="text-sm text-gray-700 dark:text-gray-300"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}
