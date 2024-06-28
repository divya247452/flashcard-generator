import React from "react";
import { Field } from "formik";

//The component renders the input for Froup Description
function GroupDescriptionInput({error}) {
  return (
    <div>
      <label htmlFor="groupDescription" className="block text-gray-500 mb-1">Add Description</label>
      <Field
        as="textarea"
        name="groupDescription"
        id="groupDescription"
        className={`w-5/6 border-2 h-16 p-1 rounded ${error? 'border-red-500' : ''}`}
        placeholder="Describe the group..."
        required
      />
    </div>
  );
}

export default GroupDescriptionInput;