import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Carasol = ({ title, url }) => {
    return (
        
            <div>
                <img src={url} style={{width: '89%', height: '89%'}} />
                <p className="legend" style={{ width: '89%',   fontSize: "1.5rem", textAlign: "inherit"}}>{title}</p>
            </div>
        
    )
}

export default Carasol