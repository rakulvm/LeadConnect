import React, {useState, useEffect} from 'react';
import './../chat.css';
import {FaTimes, FaPlus, FaPaperPlane} from "react-icons/fa"; // Import the CSS file

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

const ChatComponent: React.FC<ChatComponentProps> = ({contact}) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [chatVisible, setChatVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSendMessage = () => {
        if (message.trim()) {
            setChatHistory([...chatHistory, message]);
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
        <div>
            <div className={`chat-box ${chatVisible ? 'visible' : ''}`}>
                <div className="chat-box-header">
                    <h3>Lead Bot <span style={{fontWeight:"bold"}}>: {chatVisible ? contact.name : ''}</span> </h3>


                    <p id="addExtra" onClick={toggleChatVisibility}>
                        {/*<i className="fa fa-times"></i>*/}
                        <span className="text-buttonBlue hover:text-blue-700"><FaTimes  size={24}/></span>
                    </p>
                </div>
                <div className="chat-box-body">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className="chat-box-body-send">
                            <p>{msg}</p>
                            <span>12:00</span>
                        </div>
                    ))}
                </div>
                <div className="chat-box-footer">
                    <button id="addExtra" onClick={toggleModalVisibility}>
                        {/*<i className="fa fa-plus"></i>*/}

                        <span className="text-buttonBlue hover:text-blue-700"><FaPlus  size={24}/></span>

                    </button>
                    <input
                        placeholder="Enter Your Message"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button id="addExtra" onClick={handleSendMessage}>
                        <span className="text-buttonBlue hover:text-blue-700"><FaPaperPlane  size={24} /></span>
                    </button>
                    {/*<i className="send far fa-paper-plane" onClick={handleSendMessage}></i>*/}
                </div>
            </div>

            <div className="chat-button" onClick={toggleChatVisibility}
                 style={{display: chatVisible ? 'none' : 'block'}}>
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
