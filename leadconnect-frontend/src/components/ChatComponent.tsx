import React, { useState, useEffect, useRef } from 'react';
import './../chat.css';
import { FaTimes, FaPlus, FaPaperPlane } from "react-icons/fa"; // Import the CSS file

type Contact = {
    about: string;
    contact_url: string;
    current_location: string;
    experiences: Experience[];
    headline: string;
    name: string;
    profile_pic_url: string;
    frequency: string;
    last_interacted: string;
};

type Experience = {
    bulletpoints: string;
    company_duration: string;
    company_location: string;
    company_name: string;
    company_role: string;
    company_total_duration: string;
};

type ChatComponentProps = {
    contact: Contact;
};

const ChatComponent: React.FC<ChatComponentProps> = ({ contact }) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ text: string, time: string }[]>([]);
    const [chatVisible, setChatVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [experienceLoaded, setExperienceLoaded] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setExperienceLoaded(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatBoxRef.current && !chatBoxRef.current.contains(event.target as Node)) {
                setChatVisible(false);
            }
        };

        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setChatVisible(false);
            }
        };

        const handleEnterKey = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleSendMessage();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);

        if (inputRef.current) {
            inputRef.current.addEventListener('keydown', handleEnterKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);

            if (inputRef.current) {
                inputRef.current.removeEventListener('keydown', handleEnterKey);
            }
        };
    }, [chatBoxRef, inputRef]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const currentTime = new Date().toLocaleTimeString();
            setChatHistory([...chatHistory, { text: message, time: currentTime }]);
            setMessage('');
        }
    };

    const toggleChatVisibility = () => {
        setChatVisible(!chatVisible);
    };

    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <div className={`app-container ${chatVisible ? 'blur-background' : ''}`}>
            <div className={`chat-box ${chatVisible ? 'visible' : ''}`} ref={chatBoxRef}>
                <div className="chat-box-header">
                    <h3>Lead Bot <span style={{ fontWeight: "bold" }}>: {chatVisible ? contact.name : ''}</span> </h3>
                    <p id="addExtra" onClick={toggleChatVisibility}>
                        <span className="text-buttonBlue hover:text-blue-700"><FaTimes size={24} /></span>
                    </p>
                </div>
                <div className="chat-box-body">
                    {loading && <div className="loading">Loading...</div>}
                    {experienceLoaded && contact.experiences.map((exp, index) => (
                        <div key={index} className="chat-box-body-receive">
                            <p>{exp.bulletpoints}</p>
                            <span>{new Date().toLocaleTimeString()}</span>
                        </div>
                    ))}
                    {chatHistory.map((msg, index) => (
                        <div key={index} className="chat-box-body-send">
                            <p>{msg.text}</p>
                            <span>{msg.time}</span>
                        </div>
                    ))}
                </div>
                <div className="chat-box-footer">
                    <button id="addExtra" onClick={toggleModalVisibility}>
                        <span className="text-buttonBlue hover:text-blue-700"><FaPlus size={24} /></span>
                    </button>
                    <input
                        ref={inputRef}
                        placeholder="Enter Your Message"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button id="addExtra" onClick={handleSendMessage}>
                        <span className="text-buttonBlue hover:text-blue-700"><FaPaperPlane size={24} /></span>
                    </button>
                </div>
            </div>

            <div className="chat-button" onClick={toggleChatVisibility}
                style={{ display: chatVisible ? 'none' : 'block' }}>
                <span></span>
            </div>

            {modalVisible && (
                <div className="modal show-modal">
                    <div className="modal-content">
                        <span className="modal-close-button" onClick={toggleModalVisibility}>&times;</span>
                        <h1>Add What you want here.</h1>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;
