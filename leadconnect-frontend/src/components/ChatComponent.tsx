import React, { useState } from 'react';


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
    const [chatHistory, setChatHistory] = useState<string[]>([]);

    const handleSendMessage = () => {
        if (message.trim()) {
            setChatHistory([...chatHistory, message]);
            setMessage('');
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#f1f1f1', padding: '10px', borderTop: '1px solid #ccc' }}>
            <h3>Chat with {contact.name}</h3>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
                {chatHistory.map((msg, index) => (
                    <div key={index} style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>
                        {msg}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: '80%', padding: '10px', marginRight: '10px' }}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage} style={{ padding: '10px 20px' }}>Send</button>
        </div>
    );
};

export default ChatComponent;