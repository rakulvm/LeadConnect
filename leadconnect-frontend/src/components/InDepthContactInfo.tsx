import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Contact, Experience } from '../types'; // Import the shared types

type InDepthContactInfoProps = {
  contact: Contact;
  onClose: () => void;
};

const InDepthContactInfo: React.FC<InDepthContactInfoProps> = ({ contact, onClose }) => {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [expandedExperiences, setExpandedExperiences] = useState<Set<number>>(new Set());

  const toggleAboutSection = () => {
    setIsAboutExpanded(!isAboutExpanded);
  };

  const toggleExperienceSection = (index: number) => {
    setExpandedExperiences(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const renderTextWithToggle = (text: string, isExpanded: boolean, toggleFunction: () => void) => {
    const previewText = text.split(' ').slice(0, 30).join(' ');
    return (
      <div>
        <p className="text-gray-700 whitespace-pre-line">
          {isExpanded ? text : `${previewText}...`}
          <span onClick={toggleFunction} className="text-secondaryTextColor cursor-pointer">
            {isExpanded ? ' see less' : ' see more'}
          </span>
        </p>
      </div>
    );
  };

  const renderExperienceWithToggle = (experience: Experience, index: number) => {
    const isExpanded = expandedExperiences.has(index);
    const logoUrl = experience.company_logo || '/src/assets/fallback-img.png'; // Use fallback image if logo is null
    console.log(`Company Logo URL for ${experience.company_name}: ${logoUrl}`);
    return (
      <div key={index} className="mb-4">
        <div className="flex items-start">
          <img
            src={logoUrl}
            alt={`${experience.company_name} logo`}
            className="w-10 h-10 mr-4 mt-1"
            onError={(e) => {
              e.currentTarget.src = 'fallback-img.png'; // Path to a fallback image
              e.currentTarget.alt = 'Fallback logo';
            }}
          />
          <div>
            <h4 className="text-lg font-bold">{experience.company_name}</h4>
            <p className="text-gray-600">{experience.company_role}</p>
            <p className="text-gray-600">{experience.company_location}</p>
            <p className="text-gray-600">{experience.company_duration}</p>
            {renderTextWithToggle(experience.bulletpoints, isExpanded, () => toggleExperienceSection(index))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex justify-end items-start z-50">
      <div
        className="bg-cardWhite rounded-l-lg w-1/3 h-full p-6 relative overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={24} />
        </button>
        <div className="flex flex-col items-center">
          <div className="w-full h-32 bg-highlightBlue rounded-t-lg"></div>
          <img
            src={contact.profile_pic_url}
            alt="profile"
            className="w-24 h-24 rounded-full -mt-12 border-4 border-white"
          />
          <h2 className="text-2xl font-bold mt-4">{contact.name}</h2>
          <p className="text-secondaryTextColor text-lg">{contact.headline}</p>
          <div className="w-full mt-6">
            <h3 className="text-xl font-semibold mb-2">About</h3>
            {renderTextWithToggle(contact.about, isAboutExpanded, toggleAboutSection)}
          </div>
          <hr className="w-full my-4 border-secondaryTextColor" />
          <div className="w-full">
            <h3 className="text-xl font-semibold mb-2">Experiences</h3>
            {contact.experiences.map((experience, index) =>
              renderExperienceWithToggle(experience, index)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InDepthContactInfo;
