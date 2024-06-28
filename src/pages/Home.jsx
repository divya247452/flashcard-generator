import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { cardCreator } from "../state/actions/create-card";
import { Formik, Form, FieldArray } from "formik";
import GroupTitleInput from "../components/createFlashCard/GroupTitleInput";
import GroupDescriptionInput from "../components/createFlashCard/GroupDescriptionInput";
import DisplayPicInput from "../components/createFlashCard/DisplayPicInput";
import CardItemList from "../components/createFlashCard/CardItemList";
import FlashcardCreated from "../components/createFlashCard/FlashcardCreated";

function Home() {
  const dispatch = useDispatch();
  const [isBlurred, setIsBlurred] = useState(true);
  const [isFlashcardCreated, setFlashcardCreated] = useState(false)
  const handleSubmit = (values, { resetForm }) => {
    try {
      const existingCards = JSON.parse(localStorage.getItem('flashCards')) || []; //fetch existing flashCards from localStorage
      const updatedCards = [...existingCards, values]; // add new flashCards to the localStorage
      localStorage.setItem('flashCards', JSON.stringify(updatedCards));
      setFlashcardCreated(true)
    } catch (error) {
      console.error('Error storing flashCards in localStorage:', error);
    }

    dispatch(cardCreator(values));
    resetForm(); // clears the input fields
  };
  const handleClosePopup = () => {
    setFlashcardCreated(false);
  };
  // Validate function to check form values and return validation errors
  const validate = (values) => {
    const errors = {};

    if (!values.groupTitle) {
      errors.groupTitle = 'Group title is required';
    } else if (values.groupTitle.length < 4) {
      errors.groupTitle = 'Group title must be at least 4 characters';
    } else if (values.groupTitle.length > 21) {
      errors.groupTitle = 'Group title must not be more than 21 characters';
    }

    if (!values.groupDescription) {
      errors.groupDescription = 'Group description is required';
    } else if (values.groupDescription.length < 20) {
      errors.groupDescription = 'Group description must be at least 20 characters';
    } else if (values.groupDescription.length > 500) {
      errors.groupDescription = 'Group description must not be more than 500 characters';
    }

    if (!values.displayPic) {
      errors.displayPic = 'Please upload an image';
    }

    const cardItemErrors = values.cardItems.map((item, index) => {
      const itemErrors = {};
      if (!item.term) {
        itemErrors.term = 'Term is required';
      } else if (item.term.length < 4) {
        itemErrors.term = 'Term must be at least 4 characters';
      }
      if (!item.definition) {
        itemErrors.definition = 'Definition is required';
      } else if (item.definition.length < 10) {
        itemErrors.definition = 'Definition must be at least 10 characters';
      }
      if (!item.image) {
        itemErrors.image = 'Please upload an image';
      }
      return itemErrors; // Return validation errors for current cardItem
    });

    // Check if any cardItem has validation errors and store them in errors.cardItems
    if (cardItemErrors.some(error => Object.keys(error).length > 0)) {
      errors.cardItems = cardItemErrors;
    }
    if(!values.groupTitle || !values.groupDescription || !values.displayPic){
      setIsBlurred(true);
    }else{
      setIsBlurred(false)
    }

    return errors; // Return all validations errors
  };


  return (
    <>
    
    <Formik
      initialValues={{
        groupTitle: '',
        groupDescription: '',
        displayPic: null,
        cardItems: [{ term: '', definition: '', image: null }]
      }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="w-[90vw] sm:w-[80vw] mx-auto min-h-[60vh] mt-3">
          <div className="shadow-lg w-full bg-white p-5 rounded-lg">
            <div className="flex sm:items-center flex-wrap flex-col sm:flex-row">
              <div>
                <GroupTitleInput
                  error={errors.groupTitle && touched.groupTitle} />
                {errors.groupTitle && touched.groupTitle && (
                  <div className="text-red-500 text-xs mb-1">{errors.groupTitle}</div>
                )}
              </div>

              <div className="flex flex-col">
                <DisplayPicInput
                  setFieldValue={setFieldValue}
                  displayPic={values.displayPic}
                  error={touched.displayPic && errors.displayPic}
                  GroupTitleError={errors.groupTitle && touched.groupTitle}
                />
              </div>
            </div>

            <GroupDescriptionInput
              error={errors.groupDescription && touched.groupDescription}
            />
            {errors.groupDescription && touched.groupDescription && (
              <div className="text-red-500 text-xs mt-2">{errors.groupDescription}</div>
            )}
          </div>
          <div id="conditional" className={isBlurred ? 'conditional' : ''}>
          <div id="card-items">
            <FieldArray
              name="cardItems"
              render={(arrayHelpers) => (
                <CardItemList
                  cardItems={values.cardItems}
                  arrayHelpers={arrayHelpers}
                  errors={errors.cardItems || []}
                  touched={touched.cardItems || []}
                />
              )}
            />
          </div>
          <div className="flex justify-center mt-7">
            <button type="submit" className="btn bg-red-500 text-white rounded px-10 py-1">Create</button>
          </div>
          </div>
        </Form>
      )}
    </Formik>
    {isFlashcardCreated && <FlashcardCreated onClose={handleClosePopup}/> }
    </>
  );
}

export default Home;
