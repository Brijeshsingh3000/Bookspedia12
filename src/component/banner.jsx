import React, { useState, useEffect } from 'react';
import gogbg from "../assets/bannerpic/gogbg.jpg";
import hpbg from "../assets/bannerpic/hpbg.jpg";
import bbbg from "../assets/bannerpic/bbbg.jpg";
import shbg from "../assets/bannerpic/shbg.jpg";
import ahbg from "../assets/bannerpic/ahbg.avif";
import dcbg from "../assets/bannerpic/dcbg.jpg";
import dnbg from "../assets/bannerpic/dnbg.jpg";
import jpbg from "../assets/bannerpic/jpbg.jpg";
import mckbg from "../assets/bannerpic/mckbg.jpg";

const images = [
    gogbg,
    hpbg,
    bbbg,
    shbg,
    ahbg,
    dcbg,
    dnbg,
    jpbg,
    mckbg
];
const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideCount = images.length;
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slideCount);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <ul className="slides">
            {images.map((image, index) => (
                <React.Fragment key={index}>
                    <input
                        type="radio"
                        name="radio-btn"
                        id={`img-${index + 1}`}
                        checked={currentSlide === index}
                        readOnly
                    />
                    <li className="slide-container">
                        <div className="slide">
                            <img src={image} alt={`Slide ${index + 1}`} />
                        </div>
                    </li>
                </React.Fragment>
            ))}
            <li className="nav-dots">
                {images.map((_, index) => (
                    <label
                        key={index}
                        htmlFor={`img-${index + 1}`}
                        className="nav-dot"
                        id={`img-dot-${index + 1}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </li>
        </ul>
    );
};

export default Slider;
