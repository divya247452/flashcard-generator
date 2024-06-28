import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa";

export default function FlashcardCreated({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Set timeout for 3 seconds

    return () => clearTimeout(timer); // Clean up timeout on component unmount
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md">
        <FaCheck className="inline-block mr-2 text-xl" />
        FlashCard Created.
      </div>
    </div>
  );
}

