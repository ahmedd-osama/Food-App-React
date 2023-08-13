import { useEffect, useMemo, useReducer, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MealImage from "./assets/meals.jpg";
import CartContext from "./context/CartContext";
import MenuContext from "./context/MenuContext.";
import Cart from "./components/Cart/Cart";
import MealsSummary from "./components/Meals/MealsSummary";
import Meals from "./components/Meals/Meals";
import classes from "./components/Header/Header.module.css";
import useHTTP from "./hooks/use-http";
const cartReducer = (cartItems, { type, id, inputValue }) => {
  id = id.trim();
  type = type.trim();
  inputValue = parseInt(inputValue);
  let updatedItems = cartItems;
  if (type === "REMOVE") {
    cartItems.forEach((item, i) => {
      if (item.id === id) {
        if (parseInt(updatedItems[i].amount) <= 1) {
          updatedItems = updatedItems.filter((item) => item.id !== id);
        } else {
          updatedItems[i].amount--;
        }
      }
    });
  }
  if (type === "ADD") {
    let mealFound = false;
    cartItems.forEach((item, i) => {
      if (item.id === id) {
        updatedItems[i].amount = updatedItems[i].amount + 1;
        mealFound = true;
      }
    });
    if (!mealFound) {
      updatedItems.push({ id: id, amount: 1 });
    }
  }
  if (type === "INPUT") {
    let mealFound = false;
    cartItems.forEach((item, i) => {
      if (item.id === id) {
        if (inputValue > 0) {
          // for updating amount
          updatedItems[i].amount = parseInt(inputValue);
          mealFound = true;
        } else if (inputValue <= 0) {
          // for removing
          updatedItems = updatedItems.filter((item) => item.id !== id);
        }
      }
    });
    if (!mealFound && inputValue > 0) {
      updatedItems.push({ id: id, amount: inputValue });
    }
  }
  return [...updatedItems];
};
function App() {
  const [allMeals, setAllMeals] = useState([]);
  const options = useMemo(() => {
    return {
      URL: "https://caramel-comfort-295623-default-rtdb.europe-west1.firebasedatabase.app/menu.json",
      method: "GET",
    };
  }, []);
  const {
    error,
    isLoading,
    sendRequest: fetchMenuItems,
  } = useHTTP(options);
  useEffect(() => {
    fetchMenuItems().then((res)=>{setAllMeals(res.menuItems)})
  }, [fetchMenuItems]);
  const initialCartItems = [
    {
      id: "meal-1",
      amount: 2,
    },
    {
      id: "meal-2",
      amount: 3,
    },
  ];
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, cartDispatch] = useReducer(cartReducer, initialCartItems);
  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const itemInfo = getMealInfo(item.id);
      totalPrice += parseFloat(itemInfo.price) * parseFloat(item.amount);
    });
    return totalPrice;
  };
  function getMealInfo(id) {
    let mealObject = allMeals.filter((meal) => meal.id === id)[0];
    return { ...mealObject };
  }
  return (
    <>
      <MenuContext.Provider
        value={{ meals: allMeals, getMealInfo: getMealInfo }}
      >
        <CartContext.Provider
          value={{
            items: cartItems,
            cartDispatch: cartDispatch,
            isOpen: cartIsOpen,
            setIsOpen: setCartIsOpen,
            getTotalPrice: getTotalPrice,
          }}
        >
          <Header></Header>
          <div className={classes["main-image"]}>
            <img src={MealImage} alt="Meal Image" />
          </div>
          <Cart />
          <MealsSummary></MealsSummary>
          <Meals></Meals>
        </CartContext.Provider>
      </MenuContext.Provider>
    </>
  );
}

export default App;
