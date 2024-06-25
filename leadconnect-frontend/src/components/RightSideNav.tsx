import React, {useState} from 'react';
import {
    FaSun,
    FaUserFriends,
    FaPhone,
    FaClock,
    FaStickyNote,
    FaNetworkWired,
    FaSort,
    FaPlus,
    FaTrash,
    FaSignOutAlt,
    FaUser, FaTimes
} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';


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

type RightSideNavProps = {
    contact: Contact | null,
    setExperienceView: (contact: Contact | null) => void
};

const RightSideNav: React.FC<RightSideNavProps> = ({contact, setExperienceView}) => {
    const navigate = useNavigate();


    const [visible, setVisible] = useState(true);

    return (

        contact?.profile_pic_url ?
            <div className=' w-1/2 h-screen bg-cardWhite p-5 flex flex-col mr-[0.2rem]'
                 style={{position: "absolute", top: 0, right: 0, zIndex: 10}}>
                <div className='flex items-center mb-4'>
                    <span
                        className='ml-4 text-xl font-bold color-secondaryTextColor'>Note and Experience {contact.profile_pic_url}</span>

                </div>
                <div className="flex">
                    <img src={contact.profile_pic_url} alt="profile" className="rounded-full avatar-chat h-20 w-20"/>
                    <span style={{fontWeight: "bold", lineHeight: "2"}}> {contact.name}</span>
                    <p id="addExtra" onClick={()=>setExperienceView(null)}>
                        <span className="text-buttonBlue hover:text-blue-700"><FaTimes size={24}/></span>
                    </p>
                </div>
            </div> :
            <></>
    );
}

export default RightSideNav;