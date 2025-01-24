'use client';

import React from 'react';
import './mainbody.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { features } from 'process';
import { useAuth } from "@clerk/nextjs";

const page = () => {

    const { isLoaded, isSignedIn } = useAuth();

    return (
        <main>
            <section className="hero-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="banner-inform">
                                <h1>
                                    Discover the easiest way to schedule appointments with the <span>#1 online booking system</span>
                                </h1>
                                <p>
                                    Save time spent on coordinating appointments over phone and email with an all-in-one appointment booking software. Accept online bookings 24x7, automate payments, business management, marketing, and more!
                                </p>
                                {isLoaded && !isSignedIn && (
                                    <a href="/signup" className="get-started">Get Started Now</a>
                                )}

                            </div>
                        </div>
                        <div className="col-6">
                            <div className="banner-image-right"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="features-section">
                <div className="container">
                    <h1>
                        Our <span>Features</span>
                    </h1>
                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                                <div className="feature-icon"></div>
                                <h2>Book anywhere</h2>
                                <p>
                                    Clients can schedule appointments via the web through multiple channels; your booking website, your own website, Booking.page
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="feature-icon"></div>
                                <h2>Notifications via SMS/Email</h2>
                                <p>
                                    Reminders to staff and clients whenever appointments are booked, cancelled or rescheduled.
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="feature-icon"></div>
                                <h2>Client & Admin App</h2>
                                <p>
                                    Offer clients your own personalised client app to book your services and download the admin app to manage your business on the go
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="feature-icon"></div>
                                <h2>Reminders</h2>
                                <p>
                                    Email, SMS & Telegram reminders, & automatic booking confirmation notifications help your clients show up on time.
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="feature-icon"></div>
                                <h2>Recurring Bookings</h2>
                                <p>
                                    Easily schedule recurring appointments and get reminded before each appointment.
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="feature-icon"></div>
                                <h2>Client App</h2>
                                <p>
                                    Easily book, change or cancel bookings via the Client app. Access all your upcoming bookings.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="security-banner">
                <div className="container">
                    <div className="row">
                        <div className="col-6 flex-sec-inform">
                            <div className="security-inform">
                                <h1>
                                    Security <span>Matters!</span>
                                </h1>
                                <h3>Secure communication and all data backed daily</h3>
                                <p>
                                    We use the latest security technologies to protect your data and our clients' information. We've implemented two-factor authentication, SSL/TLS encryption, and regular security audits.
                                </p>
                                <a href="#" className="learn-more">Learn More</a>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="security-image"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="peace-option">
                <div className="container">
                    <h1>
                        Your peace of mind is our top priority!
                    </h1>
                    <div className="row r-pad">
                        <div className="wrapped-peace">
                            <div className="card">
                                <div className="flex-icon">
                                    <div className="security-icon">
                                        <i className="fa-solid fa-shield"></i>
                                    </div>
                                    <div className="peace-details">
                                        <h2>Security</h2>
                                        <p>
                                            We take customer data security very seriously. Your data is safe, backed-up on cloud, and you retain its complete ownership. Our application is hosted on Google Cloud which adheres to the highest standards of reliability and data security
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wrapped-peace">
                            <div className="card flex-icon">
                                <div className="security-icon">
                                    <i className="fa-solid fa-a"></i>
                                </div>
                                <div className="peace-details">
                                    <h2>Alert Notification</h2>
                                    <p>
                                        We take customer data security very seriously. Your data is safe, backed-up on cloud, and you retain its complete ownership. Our application is hosted on Google Cloud which adheres to the highest standards of reliability and data security
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="wrapped-peace">
                            <div className="card">
                                <div className="flex-icon">
                                    <div className="security-icon">
                                        <i className="fa-solid fa-f"></i>
                                    </div>
                                    <div className="peace-details">
                                        <h2>Free SetUp</h2>
                                        <p>
                                            We take customer data security very seriously. Your data is safe, backed-up on cloud, and you retain its complete ownership. Our application is hosted on Google Cloud which adheres to the highest standards of reliability and data security
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wrapped-peace">
                            <div className="card flex-icon">
                                <div className="security-icon">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="peace-details">
                                    <h2>Locate</h2>
                                    <p>
                                        We take customer data security very seriously. Your data is safe, backed-up on cloud, and you retain its complete ownership. Our application is hosted on Google Cloud which adheres to the highest standards of reliability and data security
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default page
