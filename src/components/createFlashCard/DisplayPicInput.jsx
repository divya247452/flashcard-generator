import React, { useRef } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { convertToBase64 } from "../utils/convertToBase64";
import { LuFileImage } from "react-icons/lu";

//The component renders the input image for Group Display Picture 
function DisplayPicInput({ displayPic, setFieldValue, error, GroupTitleError }) {
  const displayPicInputRef = useRef(null);

  const handleChangeDisplayPic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await convertToBase64(file); // Converting the input image into base64
    setFieldValue('displayPic', base64);
    displayPicInputRef.current.value = null; // Clear the input value
  };

  return (
    <>
      {displayPic ? (
        <div className="sm:ml-5 mt-3 sm:mt-0 flex gap-2 mb-3 sm:mb-0">
          <img
            src={displayPic}
            alt="Uploaded"
            className="h-[60px] w-[90px] object-cover rounded border-2"
          />
          <button
            type="button"
            onClick={() => setFieldValue('displayPic', null)}
            className="h-5 text-xs p-1 bg-blue-500 text-white rounded-full"
          >
            <MdOutlineDeleteForever />
          </button>
        </div>
      ) : (
        <label
          htmlFor="displayPic"
          className={`display-block w-[140px] sm:inline-block custom-upload-button mt-0 mb-3 sm:mb-0 sm:mt-3 sm:ml-5 cursor-pointer text-blue-500 border-2 p-[5px] rounded ${(GroupTitleError && error) ? '' : GroupTitleError ? 'sm:mb-4' : error ? 'sm:mt-[40px]' : ''}`}
        >
          <span className="flex align-center">
          <LuFileImage className="text-xl mr-1"/>Upload Image

          </span>
        </label>
      )}
      <input
        ref={displayPicInputRef}
        onChange={handleChangeDisplayPic}
        type="file"
        id="displayPic"
        accept="image/*"
        className="hidden"
      />
      {error && <p className="text-red-500 text-xs sm:mt-2 sm:ml-5">{error}</p>}
    </>
  );
}

export default DisplayPicInput;