import React, {useContext} from 'react'
import classes from './Meals.module.css'
import MealsItem from './MealsItem/MealsItem'
import MenuContext from '../../context/MenuContext.'
import CartContext from '../../context/CartContext'
import MealItemForm from './MealItemForm/MealItemForm'
import CartButton from '../Header/UI/CartButton'
import formateUSD from '../../Helpers/Formaters'
function Meals() {
  let allMeals = useContext(MenuContext).meals
  const cartItems = useContext(CartContext).items
  const cartDispatch = useContext(CartContext).cartDispatch
  const checkForValue = (id)=>{
    let itemObject = cartItems.filter(item=>item.id===id)[0]
    return itemObject? itemObject.amount: false;
  }
  return (
    <>
      <div className={classes['meals']}>
        <ul>
          
            {allMeals.map(({name, price, summary, id})=>{
              return(
                <li key={id+'-container'}>
                  <MealsItem key={id} name = {name} price = {formateUSD(price)} summary = {summary}></MealsItem>
                  <MealItemForm key={id+'-form'} value={checkForValue(id)?checkForValue(id): 0} cartDispatch = {cartDispatch} id ={id}></MealItemForm>
                </li>
              )
            })}            
        </ul>
        <CartButton style={{margin: '1em 1em 1em auto'}} ></CartButton>
      </div>
    </>
  )
}

export default Meals