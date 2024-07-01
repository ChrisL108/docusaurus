import React from 'react';
import { useLocation } from '@docusaurus/router';

export default function NotFound() {
    const location = useLocation();
    return (
        <div>
            <h1>Page Not Found</h1>
            <p>No route found for {location.pathname}</p>
        </div>
    );
}