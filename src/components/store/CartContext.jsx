import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  //state -> items[] /state manangement
  if (action.type === "ADD_ITEM") {
    /* ... update the state to add a meal item.
    check for item already present */
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //store the previous old item object in array.
    const updatedItems = [...state.items];

    //Item already exist in Item array
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      //overRide the existing UpdatedItem.
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //store the selected item in updatedItem and add quantity propert
      updatedItems.push({ ...action.item, quantity: 1 });
    }
  }
  if (action.type === "REMOVE_ITEM") {
    // ... remove an item from the state.
  }

  //return the updated state
  return { ...state, items: updatedItems };
}

export function CartContextProvider({ children }) {
  useReducer(cartReducer, { items: [] });

  return <CartContext.Provider>{children}</CartContext.Provider>;
}
export default CartContext;
