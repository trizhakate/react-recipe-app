'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/logo.png";
import Menu from "../../public/assets/menu.png";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface Categories {
    name: string;
    path: string;
}

const categories: Categories[] = [
    { name: "Seafood", path: "/recipes/seafood" },
    { name: "Chicken", path: "/recipes/chicken" },
    { name: "Beef", path: "/recipes/beef" },
    { name: "Pork", path: "/recipes/pork" },
    { name: "Sides", path: "/recipes/side" },
    { name: "Desserts", path: "/recipes/dessert" },
    { name: "Breakfast", path: "/recipes/breakfast" },
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="relative flex w-full items-center justify-between px-[20px] py-[16px] lg:container lg:mx-auto lg:px-20">
            <div className="flex items-center gap-x-4">
                <Image src={Logo} alt="Logo" />
                <h1 className="text-xl font-bold text-gray-700 font-serif">React Recipe</h1>
            </div>
            <div className="flex items-center">
                <div className="hidden lg:flex items-center gap-x-8">
                    <Link href="/" className="text-gray-700 font-medium hover:underline uppercase tracking-wide">
                        Home
                    </Link>
                    <div className="relative group">
                        <button 
                            className="flex items-center gap-x-2 text-gray-700 font-medium uppercase tracking-wide"
                        >
                            Recipes
                            <ChevronDownIcon className="w-5 h-5 ml-1 text-gray-600" />
                        </button>
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            {categories.map((item, i) => (
                                <Link key={i} href={item.path} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 uppercase tracking-wide">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link href="/#about" className="text-gray-700 font-medium hover:underline uppercase tracking-wide">
                        About
                    </Link>
                </div>
                <button onClick={toggleMenu} className="lg:hidden">
                    <Image src={Menu} alt="Menu" width={24} height={24} />
                </button>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-20">
                    <div className="flex flex-col p-4">
                        <button onClick={toggleMenu} className="text-gray-700 text-2xl mb-4 self-end">
                            &times;
                        </button>
                        <Link href="/" className="text-gray-700 font-medium py-2 uppercase tracking-wide" onClick={toggleMenu}>
                            Home
                        </Link>
                        <div className="relative group">
                            <button className="flex items-center gap-x-2 text-gray-700 font-medium uppercase tracking-wide py-2">
                                Recipes
                            </button>
                            <div className="flex flex-col">
                                {categories.map((item, i) => (
                                    <Link key={i} href={item.path} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 uppercase tracking-wide" onClick={toggleMenu}>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Link href="/#about" className="text-gray-700 font-medium py-2 uppercase tracking-wide" onClick={toggleMenu}>
                            About
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}