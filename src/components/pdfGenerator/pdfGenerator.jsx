import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { IoDownloadOutline } from "react-icons/io5";
import { BsPrinter } from "react-icons/bs";
import { HiOutlineShare } from 'react-icons/hi2';
import SharePopup from './SharePopup';

const generatePDFDocument = (cardDetails) => {
  const doc = new jsPDF();
  let yOffset = 20;
  const margin = 20;
  const lineHeight = 10;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Function to add a header with customizable text and color
  const addHeader = (text, color) => {
    doc.setTextColor(...color);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(text, margin, yOffset);
    yOffset += lineHeight * 2;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
  };

  // Function to add content with text wrapping
  const addContent = (content) => {
    const maxWidth = pageWidth - margin * 2;
    const contentLines = doc.splitTextToSize(content, maxWidth);
    contentLines.forEach(line => {
      doc.text(line, margin, yOffset);
      yOffset += lineHeight;
      if (yOffset > pageHeight - margin) {
        doc.addPage();
        yOffset = margin;
      }
    });
  };

  // Function to add an image with a border
  const addImageWithBorder = (image) => {
    const imageHeight = 50;
    const imageWidth = 50;
    if (yOffset + imageHeight > pageHeight - margin) {
      doc.addPage();
      yOffset = margin;
    }
    doc.addImage(image, 'JPEG', margin, yOffset, imageWidth, imageHeight);
    doc.rect(margin - 2, yOffset - 2, imageWidth + 4, imageHeight + 4);
    yOffset += imageHeight + 10;
  };

  // Adding group title header with blue color
  addHeader(`Group Title: ${cardDetails.groupTitle}`, [0, 0, 255]);

  if (cardDetails.displayPic) {
    addImageWithBorder(cardDetails.displayPic);
  }

  addHeader('Group Description:', [255, 0, 0]);
  addContent(cardDetails.groupDescription);

  yOffset += lineHeight;

  // Iterating over each card item to add term header and definition content
  cardDetails.cardItems.forEach((card, index) => {
    addHeader(`${index + 1}. Term: ${card.term}`, [0, 128, 0]);
    addContent(card.definition);
    
    if (card.image) {
      addImageWithBorder(card.image);
    }
    
    yOffset += lineHeight;
    if (yOffset > pageHeight - margin) {
      doc.addPage();
      yOffset = margin;
    }
  });

  return doc;
};

// Function to generate and download PDF
const generatePDF = (cardDetails) => {
  const doc = generatePDFDocument(cardDetails);
  doc.save('flashcards.pdf');
};

// Function to generate and print PDF
const printPDF = (cardDetails) => {
  const doc = generatePDFDocument(cardDetails);
  window.open(doc.output('bloburl'), '_blank').print();
};


// React component for Flashcard PDF Generator
const FlashcardPDFGenerator = ({ cardDetail }) => {
  const [showSharePopup, setShowSharePopup] = useState(false);

  // Toggling share popup visibility
  const handleShareClick = () => {
    setShowSharePopup(!showSharePopup);
  };

  return (
    <div className="relative">
      <div className="sm:flex gap-2 lg:block bg-white-300 rounded-lg">
        <button className="w-full min-w-[135px] flex flex-wrap items-center justify-center lg:justify-start bg-gray-200 hover:bg-gray-500 text-gray-800 hover:text-white font-semibold py-2 px-4 rounded-lg mb-2" onClick={() => generatePDF(cardDetail)}><IoDownloadOutline className="inline-block mr-2" />Download</button>
        <button className="w-full min-w-[135px] flex flex-wrap items-center justify-center lg:justify-start bg-gray-200 hover:bg-gray-500 text-gray-800 hover:text-white font-semibold py-2 px-4 rounded-lg mb-2" onClick={() => printPDF(cardDetail)}><BsPrinter className="inline-block mr-2" />Print</button>
        <button className="w-full min-w-[135px] flex flex-wrap items-center justify-center lg:justify-start bg-gray-200 hover:bg-gray-500 text-gray-800 hover:text-white font-semibold py-2 px-4 rounded-lg mb-2" onClick={handleShareClick}><HiOutlineShare className="inline-block mr-2" />Share</button>
      </div>

      {showSharePopup && (
        <SharePopup onClose={() => setShowSharePopup(false)} />
      )}
    </div>
  );
};

export default FlashcardPDFGenerator;
