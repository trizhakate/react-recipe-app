'use client';

import Image from 'next/image';
import { FC } from 'react';
import AboutLogo from "../../public/assets/white-logo.png"; // Ensure this path is correct

const About: FC = () => {
    return (
        <section id="about" className="bg-black text-white py-16 px-10 lg:py-24 lg:px-8">
            <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-8">
                <div className="flex-shrink-0 mb-8 lg:mb-0 lg:mr-8">
                    <Image 
                        src={AboutLogo} 
                        alt="About Logo" 
                        className="w-32 h-32 object-cover" 
                        width={100} // Add width
                        height={100} // Add height
                    />
                </div>
                <div className="flex-1 px-4 lg:px-8">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-6">About Us</h1>
                    <p className="text-lg lg:text-xl mb-6 text-justify">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. 
                        Cras luctus, sem a gravida dapibus, purus felis aliquet nunc, id vestibulum est arcu ut mauris.
                    </p>
                    <p className="text-lg lg:text-xl mb-6 text-justify">
                        Sed viverra, ante et elementum dictum, ex mauris facilisis lorem, in tincidunt arcu ligula non turpis. 
                        Nulla facilisi. Phasellus at tristique justo. Duis varius lorem non justo vehicula, ut venenatis arcu blandit.
                    </p>
                    <p className="text-lg lg:text-xl text-justify">
                        Integer id sapien nec tortor scelerisque lacinia sed vel purus. Aenean convallis orci vel lacus 
                        volutpat, in malesuada dui gravida. Morbi facilisis justo a magna feugiat, eu auctor nulla venenatis.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
