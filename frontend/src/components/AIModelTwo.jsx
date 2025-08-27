import React from 'react';
import './AIModel.css'; // We'll define animations and transitions here

const AIModelTwo = () => {
    const handleClick = () => {
        window.open('https://www.verzatai.com/', '_blank');
    };

    return (
        <div className="fixed bottom-[13%] right-3 sm:bottom-[8%] sm:right-3 z-50">
            <div
                onClick={handleClick}
                className="relative w-20 h-20 sm:w-32 sm:h-32 cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 flex items-center justify-center"
                title="Ask AI"
            >
                {/* Glowing animated ring */}
                <div className="absolute inset-0 rounded-full animate-glow-ring border-4 border-blue-500 opacity-60 pointer-events-none"></div>

                {/* AI logo image */}
                <img
                    src="/AI button/Ai_button_7.png"
                    alt="AI Logo"
                    className="w-[75%] h-[75%] object-contain rounded-full shadow-xl z-10"
                />
            </div>
        </div>

    );
};

export default AIModelTwo;
