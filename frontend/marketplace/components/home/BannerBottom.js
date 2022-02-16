import React from 'react'
import { Fade } from "react-reveal";
import Entrepeneur from '@/marketplace/assets/icons/Entrepeneur.svg';
import SectionTitle from '@/marketplace/components/typography/SectionTitle';
import Link from 'next/link'
import { BsChevronRight } from "react-icons/bs";

const BannerBottom = () => {
    
    const textStyle = {
        fontWeight: "300",
        fontSize: "16px",
        lineHeight: "22px",
        color: "#424770"
    }

const Links = [
    {
        img: "https://res.cloudinary.com/lenx2222/image/upload/v1645027998/pf-112_goqbhj.webp",
        title: "Hire quality professionals",
        text: "Hire small businesses and freelancers for your projects",
        url: "/about",
    },
    {
        img: "https://res.cloudinary.com/lenx2222/image/upload/v1645027998/ls-112_nurm2y.webp",
        title: "Manage your freelancer workforce",
        text: "Manage your projects and freelancing workforce seamlessly within one platform",
        url: "/about",
    },
    {
        img: "https://res.cloudinary.com/lenx2222/image/upload/v1645027998/cp-112_wtapca.webp",
        title: "Find quality well paid projects",
        text: "Access high quality projects within your area, apply with one click and start earning what you deserve",
        url: "/apply",
    },
    {
        img: "https://res.cloudinary.com/lenx2222/image/upload/v1645027998/wealth-112_2x_x8npvk.webp",
        title: "Marketplace",
        text: "Access and contact directly the very best and most affordable tradespeople at Wabei's marketplace",
        url: "/marketplace",
    },
]

    return (
        <>
            <Fade left duration={1000} distance="20px">
                <div className="py-16">
                    <div className="px-5">
                        <div className="mobile:w-3/5">
                            <h1 className="mb-3 font-semibold text-Black-text text-xl"> The marketplace of services </h1>
                        </div>
                        <div className= "grid lg:grid-cols-2 gap-4 mt-4">
                            {
                                Links.map(({ img, title, text, url }, index) => (
                                <div className="mt-2 mb-[48px]" key= { index }>
                                    <div className="mb-[1.6rem]">
                                        <img src= {img} alt="Entrepeneur" className="w-[112px] h-[112px]" />
                                    </div>
                                    <div className="mb-[1.44rem]">
                                        <h1 className="text-lg font-bold"> { title } </h1>
                                    </div>
                                    <div className="mb-[1.6rem]">
                                        <p className="text-[#383838]"> { text } </p>
                                    </div>
                                    <div className="">
                                        <Link href= { url }>
                                            <a className= "flex font-bold">
                                                Learn more
                                                <BsChevronRight className="my-auto"/>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                ))}
                        </div>
                    </div>
                </div>
            </Fade>
        </>
    )
}

export default BannerBottom
