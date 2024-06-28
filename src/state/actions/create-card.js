// Action creator for creating a new card with specified payload.

import { CREATE_CARD } from "../constants/actionTypes";

const cardCreator = (card) => {
    return {
        type: CREATE_CARD,
        payload : card
    }
}
export {cardCreator}