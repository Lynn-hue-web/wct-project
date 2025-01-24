'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './doctor.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { UserButton, useAuth } from '@clerk/nextjs';

const Nav = () => {
    const { isSignedIn } = useAuth();
    const [notifications, setNotifications] = useState<{ date: string; time: string; bookedAt: string }[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false); // New state for feedback notification

    const fetchNotifications = () => {
        const storedNotifications = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
        setNotifications(storedNotifications);
    };

    useEffect(() => {
        fetchNotifications();
        const handleBookingUpdate = () => {
            fetchNotifications();
        };
        window.addEventListener('bookingUpdated', handleBookingUpdate);

        return () => {
            window.removeEventListener('bookingUpdated', handleBookingUpdate);
        };
    }, []);

    const handleDeleteNotification = (index: number) => {
        const updatedNotifications = notifications.filter((_, i) => i !== index);
        setNotifications(updatedNotifications);
        localStorage.setItem('bookingHistory', JSON.stringify(updatedNotifications));
    };

    const [showNotification, setShowNotification] = useState(false);

    const FeedbackForm = () => {
        const [userName, setUserName] = useState('');
        const [userEmail, setUserEmail] = useState('');
        const [feedback, setFeedback] = useState('');

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const newFeedback = { userName, userEmail, feedback };
            const existingFeedbacks = JSON.parse(localStorage.getItem('feedbackData') || '[]');
            existingFeedbacks.push(newFeedback);
            localStorage.setItem('feedbackData', JSON.stringify(existingFeedbacks));
        


            setUserName('');
            setUserEmail('');
            setFeedback('');
            setShowFeedbackForm(false);

            setShowNotification(true);

            // Trigger auto-refresh on the Feedback page
            window.dispatchEvent(new Event('feedbackSubmitted'));

            // Hide notification after 3 seconds
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        };


        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[800px] mx-auto">
                    <h2 className="text-xl font-bold mb-4">Submit Your Feedback</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Doctor Name</label>
                            <input
                                type="text"
                                id="name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="feedback" className="block text-sm font-medium mb-2">Your Feedback</label>
                            <textarea
                                id="feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="w-full border rounded-lg p-2"
                                rows={4}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <header>
            <div className="container">
                <nav className="navbar">
                    <Link href="/" className="nav-brand">
                        <img src="/image/logo3.png" alt="Logo" className="logo" />
                    </Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/services" className="nav-link">Service</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/doctor" className="nav-link">All-Doctor</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contact" className="nav-link">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link cursor-pointer"
                                onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                            >
                                Any Feedback
                            </button>
                        </li>
                    </ul>
                    <ul className="nav-right">
                        {!isSignedIn && (
                            <li>
                                <Link href="/sign-up" className="nav-right-link nav-signup">
                                    Sign Up
                                </Link>
                            </li>
                        )}
                        <li className="notification-icon-wrapper relative">
                            <button
                                className="nav-right-link relative"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <i className="fa-solid fa-bell bg-slate-400 rounded-full p-2 text-white"></i>
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-1 ">
                                        {notifications.length}
                                    </span>
                                )}
                            </button>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50">
                                    <div className="p-4">
                                        <h4 className="text-lg font-semibold border-b pb-2 mb-2">Notifications</h4>
                                        <ul className="max-h-60 overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map((notif, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex justify-between items-center border-b py-2 text-sm text-gray-700"
                                                    >
                                                        <div>
                                                            <p>Appointment on <span className="font-medium">{notif.date}</span></p>
                                                            <p className="text-gray-500 text-xs">Time: {notif.time}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteNotification(index)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <i className="fa-solid fa-times bg-white"></i>
                                                        </button>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-center py-4 text-gray-500">No notifications</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li className="nav-right-item">
                            {!isSignedIn ? (
                                <Link href="/sign-in" className="nav-right-link profile"></Link>
                            ) : (
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: 'w-10 h-10',
                                            userButtonTrigger: 'ml-2',
                                        },
                                    }}
                                />
                            )}
                        </li>
                        <Link href="/booking-history" className="nav-right-link flex items-center gap-2">
                            <i className="fa-solid fa-book bg-blue-400 text-white p-2 rounded-full"></i>
                        </Link>
                    </ul>
                </nav>
            </div>
            {showFeedbackForm && <FeedbackForm />}
            {showNotification && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    Feedback submitted successfully!
                </div>
            )}
        </header>
    );
};

export default Nav;
