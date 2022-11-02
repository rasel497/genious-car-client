import React from 'react';
import './BannerItem.css'

const BannerItem = ({ slide }) => {
    const { id, image, prev, next } = slide;

    return (

        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className="carousel-img">
                <img src={image} alt='' className="w-full" />
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
                <h2 className='text-6xl font-bold text-white'>
                    Affordable <br />
                    Price for Car <br />
                    Servicing <br />
                </h2>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 w-2/5 left-24 top-1/2">
                <p className='text-xl text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ratione, ea hic non porro aliquid quibusdam.</p>
            </div>
            <div className="absolute flex justify-start transform -translate-y-1/2 w-2/5 left-24 top-3/4">
                <button className="btn btn-warning mr-5">Warning</button>
                <button className="btn btn-outline btn-warning">Warning</button>
            </div>

            <div className="absolute flex justify-end transform -translate-y-1/2 left-24 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle bg-red-600">❯</a>
            </div>
        </div>
    );
};

export default BannerItem;