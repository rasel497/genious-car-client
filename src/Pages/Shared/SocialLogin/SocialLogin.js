import React, { useContext } from 'react';
import { setAuthToken } from '../../../api/authToken';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';


const SocialLogin = () => {
    const { googleSignIn, facebookSignIn, gitHubSignIn } = useContext(AuthContext);

    // signInWithGoogle
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
                setAuthToken(user); //Call setAuthToken from >authToken.js
            })
            .catch(err => console.log(err));
    }

    // signInWithFacebook
    const handleFacebookSignIn = () => {
        facebookSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
                setAuthToken(user);
                // navigate(from, { replace: true });
            })
            .catch(err => console.error(err));
    }

    // SignInWithGitHub
    const handleGitHubSignIn = () => {
        gitHubSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
                setAuthToken(user);
                // navigate(from, { replace: true });
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <p className='text-center'><small>Social Login</small></p>
            <p className='text-center'>
                <button onClick={handleGoogleSignIn} className='btn btn-ghost'>Google</button>
            </p>
            <div className='flex justify-center'>
                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-primary border-none"><FcGoogle className='text-2xl'></FcGoogle></button>
                <button onClick={handleFacebookSignIn} className="btn btn-outline btn-primary border-none"><FaFacebook className='text-2xl'></FaFacebook></button>
                <button onClick={handleGitHubSignIn} className="btn btn-outline btn-primary border-none"><FaGithub className='text-2xl'></FaGithub></button>
            </div>
        </div>
    );
};

export default SocialLogin;