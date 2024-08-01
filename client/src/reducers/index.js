import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, ADD_FAVORITE, REMOVE_FAVORITE, UPDATE_FAVORITE, ADD_WISHLIST, REMOVE_WISHLIST, UPDATE_WISHLIST } from '../actions';
import { combineReducers } from 'redux';

const initialState = {
    items: [],
    favorites: [],
    wishlist: []
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

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAVORITE:
            return { ...state, favorites: [...state.favorites, action.payload] };
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter((_, index) => index !== action.payload),
            };
        case UPDATE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.map((favorite, index) =>
                    index === action.payload.index ? action.payload.newItem : favorite
                ),
            };
        default:
            return state;
    }
};

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WISHLIST:
            return { ...state, wishlist: [...state.wishlist, action.payload] };
        case REMOVE_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.filter((_, index) => index !== action.payload),
            };
        case UPDATE_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.map((wish, index) =>
                    index === action.payload.index ? action.payload.newItem : wish
                ),
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    items: itemsReducer,
    favorites: favoritesReducer,
    wishlist: wishlistReducer,
});

export default rootReducer;
