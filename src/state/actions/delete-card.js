// Action creator for deleting a card.

import {DELETE_CARD } from '../constants/actionTypes'

export function deleteCard(index){
    return{
        type: DELETE_CARD,
        payload: index
    }
}