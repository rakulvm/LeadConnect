import React, {useState, useEffect, useRef} from 'react';
import './../chat.css';
import {FaTimes, FaPlus, FaPaperPlane, FaRobot, FaUser} from "react-icons/fa";
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

type GenericChatComponentProps = {
    contacts: Contact[] | null;
};

const GenericChatComponent: React.FC<GenericChatComponentProps> = ({contacts}) => {
    const [encodedData, setEncodedData] = useState('');

    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ text: string, time: string, sender: string }[]>([]);
    const [chatVisible, setChatVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
const hash = window.location.hash;
        const queryString = hash.includes('?') ? hash.split('?')[1] : '';
        const urlParams = new URLSearchParams(queryString);
        const encodedDataS = urlParams.get('query');
        console.log(encodedDataS);
        // const encodedDataS = encodedDatad?.replace(/(-)+/g, ' ');
        if (encodedDataS) {
            try {
                setEncodedData(encodedDataS);
            } catch (error) {
                console.error('Error decoding data:', error);
            }
        }

        const initialMessages = [
                {
                    text: 'Hello, I am your virtual assistant.',
                    time: new Date().toLocaleTimeString(),
                    sender: 'bot'
                },
                {
                    text: 'Below is the job description.<br><br> ' + encodedDataS,
                    time: new Date().toLocaleTimeString(),
                    sender: 'bot'
                },
                {
                    text: '<h1>Hello,</h1>\n' +
                        '            <p>I have saved your job description. You can ask questions like:</p>\n' +
                        '\n' +
                        '            <ul style="list-style-type: disc; padding-left: 20px;">\n' +
                        '                <li>Who from my contacts is currently working in this company?</li>\n' +
                        '                <li>How can my contacts help me get more inputs about this job?</li>\n' +
                        '                <li>Generate a cover letter.</li>\n' +
                        '                <li>Generate a tailored resume.</li>\n' +
                        '            </p>\n' +
                        '    </ul>\n' +
                        '    </div>',
                    time: new Date().toLocaleTimeString(),
                    sender: 'bot'
                },


            ]
        ;

        const fetchData = async () => {
            setLoading(true);
            try {

                const users = contacts?.map(contact =>
                    "USER_NAME: " + contact.name + " ; USER_SUMMARY: " + contact.headline
                ).flat();
                const response = await axios.post('http://localhost:5000/api/llm_generic', {
                    users: users,
                    job_description: encodedData,
                    initial_context: true
                });

                const fetchedMessages = [
                    {
                        text: response.data.customized_message,
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
        // fetchData();
    }, []);

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

        document.addEventListener('enterkey', handleSendMessage);

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
            const userMessage = {text: message, time: currentTime, sender: 'user'};
            setChatHistory(prevHistory => [...prevHistory, userMessage]);
            setMessage('');

            try {
                setLoading(true);
                 const users = contacts?.map(contact =>
                    "USER_NAME: " + contact.name + " ; USER_SUMMARY: " + contact.headline
                ).flat();
                const response = await axios.post('http://localhost:5000/api/llm_generic', {
                    users: users,
                    job_description: encodedData,
                    question:message,
                    initial_context: true
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
            <div className={`chat-box-generic ${chatVisible ? 'visible' : ''}`} ref={chatBoxRef}>
                <div className="chat-box-header">
                    <img
                        src="https://cdn.dribbble.com/users/5255902/screenshots/16932664/media/975f6cbfd6c29458a4ca38030b7b6039.png?resize=400x0"
                        alt="profile" className="rounded-full "/>
                    <span style={{fontWeight: "bold", lineHeight: "2"}}> {'Assistant'}</span>
                    <p id="addExtra" onClick={toggleChatVisibility}>
                        <span className="text-buttonBlue hover:text-blue-700"><FaTimes size={24}/></span>
                    </p>
                </div>
                <div className="chat-box-body" ref={chatBodyRef}>
                    {chatHistory.map((msg, index) => (
                        msg.text && (
                            <div key={index}
                                 className={`chat-box-body-${msg.sender === 'bot' ? 'receive' : 'send'} more-width`}>
                                <div dangerouslySetInnerHTML={{__html: msg.text}}/>

                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <span style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        lineHeight: 1,
                                        display: "flex",
                                        flexDirection: "row",
                                        flex: "1"
                                    }}>{msg.sender === 'bot' ? <FaRobot className="chat-icon-receive"/> :
                                        <FaUser
                                            className="chat-icon-send"/>} {msg.sender === 'bot' ? 'Bot' : 'You'}</span>
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
                        <span className="text-buttonBlue hover:text-blue-700"><FaPlus size={24}/></span>
                    </button>
                    <input
                        ref={inputRef}
                        placeholder="Type Here"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button id="addExtra" onClick={handleSendMessage}>
                        <span className="text-buttonBlue hover:text-blue-700"><FaPaperPlane size={24}/></span>
                    </button>
                </div>
            </div>

            <div className="chat-button-generic" onClick={toggleChatVisibility}
                 style={{display: chatVisible ? 'none' : 'flex'}}>
                <img width="80px"
                     src="https://cdn.dribbble.com/users/5255902/screenshots/16932664/media/975f6cbfd6c29458a4ca38030b7b6039.png?resize=400x0"
                     alt="profile" className="rounded-full"/>
                <p className="generic-chat-title">Let's Chat</p>
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

export default GenericChatComponent;
