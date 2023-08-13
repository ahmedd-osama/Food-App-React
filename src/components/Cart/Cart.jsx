import React, {useContext, useEffect, useMemo} from 'react'
import CartContext from '../../context/CartContext'
import Modal from '../Header/UI/Modal/Modal'
import CartItem from './CartItem/CartItem'
import classes from './Cart.module.css'
import MenuContext from '../../context/MenuContext.'
import formateUSD from '../../Helpers/Formaters'
import useHTTP from '../../hooks/use-http'
function Cart() {
  // states from context
  const isOpen = useContext(CartContext).isOpen
  const setIsOpen = useContext(CartContext).setIsOpen
  const cartDispatch = useContext(CartContext).cartDispatch
  const cartItems = useContext(CartContext).items
  const getTotalPrice = useContext(CartContext).getTotalPrice
  const getMealInfo =useContext(MenuContext).getMealInfo
  const setCheckout = useContext(CartContext).setCheckout
  // fetching data from server 
  const GetCartOptions = useMemo(() => {
    return {
      URL: "https://caramel-comfort-295623-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
      method: "GET",
    };
  }, []);
  const {sendRequest: getCartItems, isLoading: cartIsLoading, error: cartHasError} = useHTTP(GetCartOptions)
  useEffect(() => {
    getCartItems().then(res => cartDispatch({type: 'FETCH', value: res['-NbkQ4A6zTbkESdEgHsV']}))
  }, [getCartItems])

  // posting to server 
  // const postCartOptions = useMemo(() => {
  //   return {
  //     URL: "https://caramel-comfort-295623-default-rtdb.europe-west1.firebasedatabase.app/cart/-NbkQ4A6zTbkESdEgHsV.json",
  //     method: "SET",
  //     body: cartItems
  //   };
  // }, []);
  // const {sendRequest: postCartItems} = useHTTP(postCartOptions)
  // useEffect(() => {
  //   postCartItems().then(res => console.log(res))
  // }, [cartItems])
  
  // functions
  const handleCheckOut = () => { 
    const finalCartData = cartItems.map(item=>{
      let iteminfo = getMealInfo(item.id)
      return {id: item.id, amount: item.amount, name : iteminfo.name, summary: iteminfo.summary, }
    })
    const data ={items: finalCartData, totalPrice : formateUSD(getTotalPrice())};
    setCheckout(true)
    setIsOpen(false)
    return data;
   }
  const hasItems = () => { 
    return cartItems.length? true: false
   }
  //  maped components
  const cartItemsElements = cartItems.map(item=> {
    const mealInfo = getMealInfo(item.id);
    return(
      <CartItem key = {item.id} id = {item.id}name={mealInfo.name} cartDispatch={cartDispatch} amount={item.amount} price={mealInfo.price}></CartItem>
    ) 
  })
  //JSX 
  return (
    <>
    <Modal setIsOpen={setIsOpen} isOpen = {isOpen}>
      <ul className={classes['cart-items']}>
      {cartItemsElements}
      <li className={classes['only-child-block']}> <h2>You have no items in your Cart For now 😢</h2> </li>
      </ul>
      <div className={classes.total}><span>Total:</span> <span>{formateUSD(getTotalPrice())}</span></div>
      <div className={classes.actions}>
        <button onClick={()=>{setIsOpen(false)}}>Close</button>
        {hasItems()&& <button onClick={handleCheckOut}>Order</button>}
      </div>
    </Modal>
    </>
  )
}

export default Cart