'use client';

import Image from 'next/image';
import { FC } from 'react';
import AboutLogo from "../../public/assets/white-logo.png"; // Ensure this path is correct

const Footer: FC = () => {
    return (
        <footer className="bg-[#94D82D] text-white py-2 text-center">
        <p>© 2024 Your Company Name. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
