import React, {useContext, useState, useEffect} from 'react'
import CartContext from '../../../context/CartContext'
import CartIcon from '../../../assets/Icons/Cart'
import classes from './CartButton.module.css'
function CartButton({style}) {
  const cartItemsNumber = useContext(CartContext).items.length
  const setIsOpen = useContext(CartContext).setIsOpen
  const handleClick = () => { 
    setIsOpen(true)
   }
  // animation
  const [buttonPump, setButtonPump] = useState(true)
  useEffect(() => {
    setButtonPump(true)
    const timer = setTimeout(() => {
      setButtonPump(false)
    }, 1000);
  
    // celan up
    return ()=>{
      clearTimeout(timer)
    }
    
  }, [cartItemsNumber])
  
  return (
    <button className={buttonPump && classes["button-pump"]} style={{display: 'flex', alignItems: 'center',...style}} onClick={handleClick} ><CartIcon style = {{display: 'block', width: '1.5em'}}></CartIcon>Cart {cartItemsNumber}</button>
  )
}
export default CartButton