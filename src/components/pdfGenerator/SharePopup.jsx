import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaTwitter, FaEnvelope } from 'react-icons/fa';

// Function to handle sharing to different apps
const handleAppShare = (appUrlScheme, webUrl) => {

  // Creating a hidden iframe to trigger the app's URL scheme
  const ifr = document.createElement('iframe');
  ifr.style.display = 'none';
  ifr.src = appUrlScheme;
  document.body.appendChild(ifr);

  const now = Date.now();
  // Set a timeout to open the web URL if app didn't respond in time
  setTimeout(() => {
    if (Date.now() - now < 2000) {
      window.open(webUrl, '_blank');  // Open web URL in new tab if app scheme failed
    }
    document.body.removeChild(ifr);
  }, 1500);
};

// Function to copy text to clipboard
const copyToClipboard = (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Link copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  } else {
    // Fallback for browsers that don't support clipboard API
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = 0;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');// Attempt to copy using execCommand
      console.log('Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
    document.body.removeChild(textarea);// Clean up textarea element
  }
};

// SharePopup component
const SharePopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Share</h3>
        <div className="flex justify-around mb-4">
          <FaFacebookF className="cursor-pointer" onClick={() => handleAppShare('fb://', 'https://www.facebook.com')} />
          <FaLinkedinIn className="cursor-pointer" onClick={() => handleAppShare('linkedin://', 'https://www.linkedin.com')} />
          <FaWhatsapp className="cursor-pointer" onClick={() => handleAppShare('whatsapp://send?text=', 'https://www.whatsapp.com')} />
          <FaTwitter className="cursor-pointer" onClick={() => handleAppShare('twitter://post?message=', 'https://www.twitter.com')} />
          <FaEnvelope className="cursor-pointer" onClick={() => handleAppShare('mailto:?body=', 'https://mail.google.com')} />
        </div>
        <input type="text" value={window.location.href} readOnly className="w-full p-2 border rounded mb-4" />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={() => copyToClipboard(window.location.href)}
        >
          Copy Link
        </button>
        <button className="w-full bg-red-500 text-white py-2 rounded mt-2" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SharePopup;
