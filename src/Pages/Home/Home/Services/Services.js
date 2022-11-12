import React, { useEffect, useRef, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    const [isAsc, setIsAsc] = useState(true);
    const [search, setSearch] = useState('');

    const searchRef = useRef();

    useEffect(() => {
        fetch(`http://localhost:5000/services?search=${search}&order=${isAsc ? 'asc' : 'dsc'}`)
            .then(res => res.json())
            .then(data => setServices(data))

    }, [isAsc, search]);

    const handleSearch = () => {
        setSearch(searchRef.current.value);
    }

    return (
        <div>
            <div className='text-center mb-4'>
                <p className="text-2xl font-bold text-orange-600">Services</p>
                <h2 className='text-5xl font-semibold'>Our Services Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>


                {/* <input ref={searchRef} type="text" className='border' />
                    <button onClick={handleSearch} className='btn btn-ghost bg-green-500'>Search</button> */}

                <div className="form-control">
                    <div className="input-group justify-center py-4">
                        <input ref={searchRef} type="text" placeholder="Search…" className="input input-bordered" />
                        <button onClick={handleSearch} className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>

                <button className='btn btn-ghost bg-red-500' onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'Reverse Desc' : 'Reverse Asc'}</button>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;