import React, { useRef } from "react";
import { Field, ErrorMessage } from "formik";
import { convertToBase64 } from "../utils/convertToBase64";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { LuFileImage } from "react-icons/lu";

function CardItem({ cardItems, item, index, arrayHelpers, errors, touched }) {
  const inputRef = useRef(null);
  const termInputRef = useRef(null);

  // Updaets the Image of CardItem
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    arrayHelpers.replace(index, { ...item, image: base64 });
    inputRef.current.value = null; // Clear the input value
  };

  //To Edit the current "Term"
  const handleEditClick = () => {
    if (termInputRef.current) {
      termInputRef.current.focus();
    }
  };

  // Deletes the current CardItem
  const handleDeleteClick = () => {
    if (arrayHelpers.form.values.cardItems.length === 1) {
      arrayHelpers.replace(index, { term: '', definition: '', image: null });
    } else {
      arrayHelpers.remove(index);
    }
  };

  return (
    <li key={index} className="flex gap-4 items-start">
      {/* Custom serial number */}
      <div className="mt-4 px-2 bg-red-500 text-lg text-white rounded-full">
        {index + 1}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-3 flex-1">
        <div className="flex flex-col gap-2">
          <label htmlFor={`term-${index}`} className="text-gray-500">Enter Term*</label>
          <Field
            type="text"
            id={`term-${index}`}
            name={`cardItems.${index}.term`}
            className={`border-2 rounded h-10 ${errors?.term && touched?.term ? 'border-red-500' : ''}`}
            innerRef={termInputRef}
            required
          />
          <ErrorMessage name={`cardItems.${index}.term`} component="div" className={`text-red-500 text-xs mt-1`} />
        </div>

        <div className="flex flex-col gap-2 mb-3 md:mb-0">
          <label htmlFor={`definition-${index}`} className="text-gray-500">Enter Definition*</label>
          <Field
            as="textarea"
            id={`definition-${index}`}
            name={`cardItems.${index}.definition`}
            className={`border-2 rounded h-10 ${errors?.definition && touched?.definition ? 'border-red-500' : ''}`}
            required
          />
          <ErrorMessage name={`cardItems.${index}.definition`} component="div" className={`text-red-500 text-xs mt-1`} />
        </div>

        <div className="flex flex-col gap-2">
          {item.image ? (
            <div className="relative inline-block flex gap-2">
              <img src={item.image} alt="Uploaded" className="h-[60px] w-[90px] object-cover rounded border-2 mt-6" />
              <div className="flex flex-col mt-6 justify-between h-[60px]">
                <button type="button" onClick={handleDeleteClick} className="bg-blue-500 text-white rounded-full p-1 text-xs" aria-label="delete-term">
                  <MdOutlineDeleteForever />
                </button>
                <button type="button" onClick={handleEditClick} aria-label="edit-term">
                  <GrEdit />
                </button>
              </div>
            </div>
          ) : (
            cardItems.length === 1 ? (
              <div className="flex gap-2">
                <label htmlFor={`image-upload-${index}`} className={`custom-upload-button lg:ml-5 cursor-pointer text-blue-500 border-2 p-1.5 rounded  h-[40px] w-[140px] mt-0 md:mt-[31px]`}>
                  <span className="flex align-center">
                    <LuFileImage className="text-xl mr-1" />Select Image
                  </span>
                </label>

                <button type="button" className="md:mt-6" onClick={handleEditClick} aria-label="edit-term">
                  <GrEdit />
                </button>
              </div>

            ) : (
              <div className="flex gap-2">
                <label
                  htmlFor={`image-upload-${index}`}
                  className={`custom-upload-button lg:ml-5 cursor-pointer text-blue-500 border-2 p-1.5 rounded  h-[40px] w-[140px] mt-0 md:mt-[31px]`}
                >
                  <span className="flex align-center">
                    <LuFileImage className="text-xl mr-[2px]" />Select Image

                  </span>
                </label>
                <div className="flex flex-col justify-between h-[50px] mt-0 md:mt-6">
                  <button type="button" onClick={handleDeleteClick} aria-label="delete-term" className="bg-blue-500 text-white rounded-full p-1 text-xs">
                    <MdOutlineDeleteForever />
                  </button>
                  <button type="button" aria-label="edit-term" className="text-sm" onClick={handleEditClick}>
                    <GrEdit />
                  </button>
                </div>
              </div>
            )
          )}
          <input ref={inputRef} type="file" id={`image-upload-${index}`} accept="image/*" name={`cardItems.${index}.image`} onChange={handleImageChange} className="hidden" />
          <ErrorMessage name={`cardItems.${index}.image`} component="div" className={`text-red-500 text-xs mt-1 md:pl-5`} />
        </div>
      </div>
    </li>
  );
}

export default CardItem;