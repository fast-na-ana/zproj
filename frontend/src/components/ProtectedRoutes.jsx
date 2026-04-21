import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const [isChecking, setIsChecking] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                setIsValid(false);
                setIsChecking(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/auth/verify', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    setIsValid(true);
                } else {
                    console.error('Token verification failed:', response.status);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setIsValid(false);
                }
            } catch (error) {
                console.error('Token verification error:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsValid(false);
            } finally {
                setIsChecking(false);
            }
        };

        // Give localStorage a moment to sync across the browser
        const timeoutId = setTimeout(checkToken, 100);
        
        return () => clearTimeout(timeoutId);
    }, [token]);

    if (isChecking) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#0e0c15] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-900/30 border-t-purple-500 rounded-full animate-spin"></div>
                    <p className="text-zinc-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isValid) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;