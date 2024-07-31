import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    items: []
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return { ...state, items: [...state.items, action.payload] };
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter((_, index) => index !== action.payload)
            };
        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map((item, index) =>
                    index === action.payload.index ? action.payload.newItem : item
                )
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    items: itemsReducer
});

export default rootReducer;
