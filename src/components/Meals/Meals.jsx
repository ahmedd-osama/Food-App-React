import React, {useContext, useMemo, useEffect} from 'react'
import classes from './Meals.module.css'
import MealsItem from './MealsItem/MealsItem'
import MenuContext from '../../context/MenuContext.'
import CartContext from '../../context/CartContext'
import MealItemForm from './MealItemForm/MealItemForm'
import CartButton from '../Header/UI/CartButton'
import formateUSD from '../../Helpers/Formaters'
import Spinner from '../Spinner/Spinner' 
import useHTTP from '../../hooks/use-http'
function Meals() {
  const allMeals = useContext(MenuContext).meals
  const setAllMeals = useContext(MenuContext).setAllMeals
  const cartItems = useContext(CartContext).items
  const cartDispatch = useContext(CartContext).cartDispatch
  // fetching menuItems from serve
  const options = useMemo(() => {
    return {
      URL: "https://caramel-comfort-295623-default-rtdb.europe-west1.firebasedatabase.app/menu.json",
      method: "GET",
    };
  }, []);
  const {
    isLoading,
    sendRequest: fetchItems,
  } = useHTTP(options);
  const fetchMemnuItems = async ()=>{
    fetchItems().then((res)=>{setAllMeals(res.menuItems)})
  }
  useEffect(() => {
    fetchMemnuItems()
  }, [fetchItems]);
  const checkForValue = (id)=>{
    let itemObject = cartItems.filter(item=>item.id===id)[0]
    return itemObject? itemObject.amount: false;
  }
  const MealsContent = allMeals.map(({name, price, summary, id})=>{
    return(
      <li key={id+'-container'}>
        <MealsItem key={id} name = {name} price = {formateUSD(price)} summary = {summary}></MealsItem>
        <MealItemForm key={id+'-form'} value={checkForValue(id)?checkForValue(id): 0} cartDispatch = {cartDispatch} id ={id}></MealItemForm>
      </li>
    )
  }) 
  return (
    <>
      <div className={classes['meals']}>
        <ul>
          
            {MealsContent.length>0 && !isLoading ? MealsContent : !isLoading && <h2>No Data Found</h2> }            
            {isLoading && <Spinner />}
        </ul>
        <CartButton style={{margin: '1em 1em 1em auto'}} ></CartButton>
      </div>
    </>
  )
}

export default Meals