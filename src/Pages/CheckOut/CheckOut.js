import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const CheckOut = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = event => {
        event.preventDefault();

        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistred';
        const phone = form.phone.value;
        const message = form.message.value;

        // create order object and save backend
        const order = {
            service: _id,
            serviceNmae: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        // if (phone.length > 10) {
        //     alert('Phone number shuld be 10 character or long');
        // }
        // else {
        //     console.log('done');
        // }

        // for create order in post api data
        fetch('https://genious-car-server-eosin.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('Order placed successfully');
                    form.reset();
                }
            })
            .catch(err => console.error(err));

    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-2xl'>Youn are about to order: {title}</h2>
                <h4 className='text-1xl text-bold'>Price: {price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-ghost w-full input-bordered" />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-ghost w-full input-bordered" />
                    <input name='phone' type="text" placeholder="Your Phone" className="input input-ghost w-full input-bordered" required />
                    <input name='email' type="text" placeholder="Your E-mail" defaultValue={user?.email} className="input input-ghost w-full input-bordered" readOnly />
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your message...." required></textarea>
                <input className='btn' type="submit" value="Place Your Order" />
            </form>
        </div>
    );
};

export default CheckOut;