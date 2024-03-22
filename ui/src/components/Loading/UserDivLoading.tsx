import React from 'react';
import '../../styles/userDivLoading.css';

const UserDivLoading = () => (
    <div className="skeleton-loader w-[25%] flex items-center justify-start">
        <div className="skeleton-button text-white border border-white px-4 py-2 text-lg rounded-lg mr-8">
            <div className="flex items-center">
                <div className="skeleton-image-container relative">
                    <div className="skeleton-image w-8 h-8 rounded-full mr-2 bg-white animate-pulse"></div>
                </div>
                <div className="skeleton-text-container relative">
                    <div className="skeleton-text w-20 h-1 mr-2 m-1 bg-white animate-pulse"></div>
                    <div className="skeleton-text w-20 h-1 mr-2 m-1 bg-white animate-pulse"></div>
                    <div className="skeleton-text w-20 h-1 mr-2 m-1 bg-white animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);

export default UserDivLoading;
