import React, {useContext} from 'react'
import CartContext from '../../context/CartContext'
import Modal from '../Header/UI/Modal/Modal'
import CartItem from './CartItem/CartItem'
import classes from './Cart.module.css'
import MenuContext from '../../context/MenuContext.'
import formateUSD from '../../Helpers/Formaters'
function Cart() {
  const isOpen = useContext(CartContext).isOpen
  const setIsOpen = useContext(CartContext).setIsOpen
  const cartDispatch = useContext(CartContext).cartDispatch
  const cartItems = useContext(CartContext).items
  const getTotalPrice = useContext(CartContext).getTotalPrice
  const getMealInfo =useContext(MenuContext).getMealInfo
  // functions
  const handleCheckOut = () => { 
    const finalCartData = cartItems.map(item=>{
      let iteminfo = getMealInfo(item.id)
      return {id: item.id, amount: item.amount, name : iteminfo.name, summary: iteminfo.summary, }
    })
    const data ={items: finalCartData, totalPrice : formateUSD(getTotalPrice())};
    console.log(data)
    return data;
   }
  return (
    <>
    <Modal setIsOpen={setIsOpen} isOpen = {isOpen}>
      <ul className={classes['cart-items']}>
      {cartItems.map(item=> {
        const mealInfo = getMealInfo(item.id);
        return(
          <CartItem key = {item.id} id = {item.id}name={mealInfo.name} cartDispatch={cartDispatch} amount={item.amount} price={mealInfo.price}></CartItem>
        ) 
      })}
      <li className={classes['only-child-block']}> <h2>You have no items in your Cart For now 😢</h2> </li>
      </ul>
      <div className={classes.total}><span>Total:</span> <span>{formateUSD(getTotalPrice())}</span></div>
      <div className={classes.actions}>
        <button onClick={()=>{setIsOpen(false)}}>Close</button>
        <button onClick={handleCheckOut}>Checkout</button>
      </div>
      
    </Modal>
    </>
  )
}

export default Cart