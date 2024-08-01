export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item
});

export const removeItem = (item) => ({
  type: REMOVE_ITEM,
  payload: item
});

export const updateItem = (index, newItem) => ({
  type: UPDATE_ITEM,
  payload: { index, newItem }
});

export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const UPDATE_FAVORITE = 'UPDATE_FAVORITE';

export const addFavorite = (item) => ({
  type: ADD_FAVORITE,
  payload: item,
});

export const removeFavorite = (index) => ({
  type: REMOVE_FAVORITE,
  payload: index,
});

export const updateFavorite = (index, newItem) => ({
  type: UPDATE_FAVORITE,
  payload: { index, newItem },
});

export const ADD_WISHLIST = 'ADD_WISHLIST';
export const REMOVE_WISHLIST = 'REMOVE_WISHLIST';
export const UPDATE_WISHLIST = 'UPDATE_WISHLIST';

export const addWishlist = (item) => ({
  type: ADD_WISHLIST,
  payload: item,
});

export const removeWishlist = (index) => ({
  type: REMOVE_WISHLIST,
  payload: index,
});

export const updateWishlist = (index, newItem) => ({
  type: UPDATE_WISHLIST,
  payload: { index, newItem },
});