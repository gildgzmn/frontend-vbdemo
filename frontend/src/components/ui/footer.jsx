import React, { useState } from 'react';

const Footer = () => {        
    return (
        <section className="py-10 bg-gray-900 sm:pt-16 lg:pt-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                <h1 className="text-2xl font-bold text-white">ANO DITO</h1>

                <p className="text-base leading-relaxed text-gray-600 mt-7">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>

            </div>

            <div>
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Government</p>

                <ul className="mt-6 space-y-4">
                    
                    <li>
                        <a href="#" title="" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Data </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Voter's Profile </a>
                    </li>

                    <li>
                        <a href="https://www.batangas.gov.ph/portal/" title="" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Provincial Government of Batangas  </a>
                    </li>

                </ul>
            </div>

            <div>
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Help</p>

                <ul className="mt-6 space-y-4">
                    <li>
                        <a href="#" title="" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Customer Support </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Terms & Conditions </a>
                    </li>

                    <li>
                        <a href="#" title="" className="flex text-base text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Privacy Policy </a>
                    </li>
                </ul>
            </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-600">© Copyright 2024</p>
    </div>
</section>

    )
}
export default Footer;