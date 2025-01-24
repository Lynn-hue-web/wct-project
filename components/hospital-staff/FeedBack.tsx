import React, { useEffect, useState } from 'react';

const FeedBack = () => {
    const [feedbackList, setFeedbackList] = useState<{ userName: string; userEmail: string; feedback: string }[]>([]);

    // Function to fetch feedback data from local storage
    const fetchFeedbackData = () => {
        const storedFeedback = JSON.parse(localStorage.getItem('feedbackData') || '[]');
        setFeedbackList(storedFeedback);
    };

    // Function to delete feedback by index
    const handleDeleteFeedback = (index: number) => {
        const updatedFeedback = feedbackList.filter((_, i) => i !== index);
        localStorage.setItem('feedbackData', JSON.stringify(updatedFeedback));
        setFeedbackList(updatedFeedback);

        // Dispatch event to inform other components about the change
        window.dispatchEvent(new Event('feedbackSubmitted'));
    };

    useEffect(() => {
        fetchFeedbackData();

        // Function to update feedback data when submission occurs
        const handleFeedbackUpdate = () => {
            fetchFeedbackData();
        };

        // Listen for feedback submission event and storage changes
        window.addEventListener('feedbackSubmitted', handleFeedbackUpdate);
        window.addEventListener('storage', handleFeedbackUpdate);

        return () => {
            window.removeEventListener('feedbackSubmitted', handleFeedbackUpdate);
            window.removeEventListener('storage', handleFeedbackUpdate);
        };
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">User Feedback</h1>
            {feedbackList.length > 0 ? (
                <ul className="space-y-4">
                    {feedbackList.map((item, index) => (
                        <li key={index} className="p-4 border rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold">{item.userName}</h2>
                                <p className="text-sm text-gray-500">{item.userEmail}</p>
                                <p className="mt-2 text-gray-700">{item.feedback}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteFeedback(index)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No feedback submitted yet.</p>
            )}
        </div>
    );
};

export default FeedBack;
