import React, { useState, useEffect, useRef } from 'react';
import './../chat.css';
import { FaTimes, FaPlus, FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import axios from 'axios';

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
    const [chatHistory, setChatHistory] = useState<{ text: string, time: string, sender: string }[]>([]);
    const [chatVisible, setChatVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initialMessages = [
            {
                text: 'Hi, Please wait I am contextualizing this chat with ' + contact.name + ' data.',
                time: new Date().toLocaleTimeString(),
                sender: 'bot'
            },
            {
                text: 'Below is the summary of that user.',
                time: new Date().toLocaleTimeString(),
                sender: 'bot'
            }
        ];

        const fetchData = async () => {
            setLoading(true);
            try {
                const experiences = contact.experiences.map(exp => exp.bulletpoints);
                const response = await axios.post('http://localhost:5000/api/llm', {
                    experiences,
                    initial_context: true
                });

                const fetchedMessages = [
                    {
                        text: response.data.customized_message,
                        time: new Date().toLocaleTimeString(),
                        sender: 'bot'
                    },
                    {
                        text: `You can ask below things to this person: 
                             - "Do you have any openings in your company?"
                             - "I have an interview in a few days in your company and need your guidance."
                             - "Are you free for a coffee chat this month?"
                             - "I am trying to learn emerging technologies and your profile looks good. Can you guide me on how to start with my preparation?"`,
                        time: new Date().toLocaleTimeString(),
                        sender: 'bot'
                    }
                ];

                setChatHistory([...initialMessages, ...fetchedMessages]);
            } catch (error) {
                console.error('Error sending experiences:', error);
            } finally {
                setLoading(false);
            }
        };

        setChatHistory(initialMessages);
        fetchData();
    }, [contact.experiences]);
    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

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

    const scrollToBottom = () => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    };

    const handleSendMessage = async () => {
        if (message.trim()) {
            const currentTime = new Date().toLocaleTimeString();
            const userMessage = { text: message, time: currentTime, sender: 'user' };
            setChatHistory(prevHistory => [...prevHistory, userMessage]);
            setMessage('');

            try {
                setLoading(true);

                const experiences = contact.experiences.map(exp => exp.bulletpoints);
                const response = await axios.post('http://localhost:5000/api/llm', {
                    experiences,
                    question: message,
                    initial_context: false
                });
                const botMessage = {
                    text: response.data.customized_message,
                    time: new Date().toLocaleTimeString(),
                    sender: 'bot'
                };
                setChatHistory(prevHistory => [...prevHistory, botMessage]);
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                setLoading(false);
            }
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
                    <img src={contact.profile_pic_url} alt="profile" className="rounded-full avatar-chat" />
                    <span style={{ fontWeight: "bold", lineHeight: "2" }}> {chatVisible ? contact.name : ''}</span>
                    <p id="addExtra" onClick={toggleChatVisibility}>
                        <span className="text-buttonBlue hover:text-blue-700"><FaTimes size={24} /></span>
                    </p>
                </div>
                <div className="chat-box-body" ref={chatBodyRef}>
                    {chatHistory.map((msg, index) => (
                        msg.text && (
                            <div key={index} className={`chat-box-body-${msg.sender === 'bot' ? 'receive' : 'send'}`}>
                                <p>{msg.text}</p>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <span style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        lineHeight: 1,
                                        display: "flex",
                                        flexDirection: "row",
                                        flex: "1"
                                    }}>{msg.sender === 'bot' ? <FaRobot className="chat-icon-receive" /> :
                                        <FaUser className="chat-icon-send" />} {msg.sender === 'bot' ? 'Bot' : 'You'}</span>
                                    <span>{msg.time}</span>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                {loading && (
                    <div className="dot-falling-container">
                        <div className="dot-falling"></div>
                    </div>
                )}
                <div className="chat-box-footer">
                    <button id="addExtra" onClick={toggleModalVisibility}>
                        <span className="text-buttonBlue hover:text-blue-700"><FaPlus size={24} /></span>
                    </button>
                    <input
                        ref={inputRef}
                        placeholder="Type Here"
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
                style={{ display: chatVisible ? 'none' : 'flex' }}>
                <img src={contact.profile_pic_url} alt="profile" className="rounded-full avatar-chat" />
                {contact.name}
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
