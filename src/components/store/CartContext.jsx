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

    //return the updated state
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    // ... remove an item from the state.

    //Check for existing element.
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    /*single item present in cart 
      splice method parameter: index, number of item*/
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    //return the updated state
    return { ...state, items: updatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  console.log("cart context", cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
export default CartContext;
