// Reducer function for managing flash card creation and deletion based on dispatched actions.

import { CREATE_CARD } from "../constants/actionTypes";
import { DELETE_CARD } from "../constants/actionTypes";

const INIT_STATE = JSON.parse(localStorage.getItem('flashCards')) || []; //getting existing flashCards from localStorage.

const cardReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CREATE_CARD:
            return [...state, action.payload]
        case DELETE_CARD:
            const updatedCards = state.filter((_, index) => index !== action.payload);
            localStorage.setItem('flashCards', JSON.stringify(updatedCards));
            return updatedCards;
        default:
            return state
    }
}

export { cardReducer }