import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../state/atoms/prompt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { SERVER_URL } from '../constants/serverUrl';

export default function AuthenticationTool() {
    const [loggedInState, setLoggedInState] = useRecoilState(isLoggedInState);
    const { logged_in, name, email, picture } = loggedInState;

    useEffect(() => {
        // Check if the user is logged in based on the stored token
        const authToken = Cookies.get('auth_token');
        if (authToken) {
            axios.post(`${SERVER_URL}/verify_token`, { token: authToken })
                .then(response => {
                    const { valid_token, user_info } = response.data;
                    if (valid_token) {
                        setLoggedInState({
                            logged_in: true,
                            name: user_info.name, // Get name from storage if needed
                            email: user_info.email, // Get email from storage if needed
                            picture: user_info.picture // Get picture from storage if needed
                        });
                    }
                })
                .catch(error => {
                    console.error('Error verifying token:', error);
                });
        }
    }, []);

    const handleLoginButtonClick = () => {
        const authUrl = `${SERVER_URL}/login`;
        const width = 800;
        const height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const features = `width=${width},height=${height},left=${left},top=${top}`;

        const miniBrowser = window.open(authUrl, 'MiniBrowserWindow', features);

        window.addEventListener('message', event => {
            if (event.source === miniBrowser) {
                const { is_authenticated, name, email, picture, token } = event.data;
                setLoggedInState({
                    logged_in: is_authenticated,
                    name: name,
                    email: email,
                    picture: picture
                });
                Cookies.set('auth_token', token, { expires: 7 });
            }
        });
    };

    return (
        <div className="mt-6 w-full flex justify-end">
            {logged_in ? (
                <div className="w-[25%] flex items-center justify-start">
                    <button className="text-white border border-white px-4 py-2 text-lg rounded-lg mr-8">
                        <div className="flex items-center">
                            <img src={picture} alt={name} className="w-12 h-12 rounded-full mr-2" />
                            <span>{name}</span>
                        </div>
                    </button>
                </div>
            ) : (
                <div className="w-[25%]">
                    <button className="text-white border border-white px-4 py-2 text-lg rounded-lg mr-4" onClick={handleLoginButtonClick}>
                        <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                        Sign in with Google
                    </button>
                </div>
            )}
        </div>
    );
}
