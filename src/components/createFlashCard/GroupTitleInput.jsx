import React from "react";
import { Field } from "formik";

//The component renders the input for the Group Title
function GroupTitleInput({error}) {
  return (
    <div className="mb-4">
      <label htmlFor="groupTitle" className="block text-gray-500 mb-1">Create Group*</label>
      <div className="flex sm:items-center flex-wrap flex-col sm:flex-row">
        <Field
          name="groupTitle"
          type="text"
          id="groupTitle"
          className={`md:min-w-[400px] border-2 rounded p-1 ${error?'border-red-500':''}`}
          required
        />
      </div>
    </div>
  );
}

export default GroupTitleInput;