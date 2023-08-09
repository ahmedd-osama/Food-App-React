import React, {useContext} from 'react'
import CartContext from '../../../context/CartContext'
import CartIcon from '../../../assets/Icons/Cart'
function CartButton({style}) {
  const cartItemsNumber = useContext(CartContext).items.length
  const setIsOpen = useContext(CartContext).setIsOpen
  const handleClick = () => { 
    setIsOpen(true)
   }
  return (
    <button style={{display: 'flex', alignItems: 'center',...style}} onClick={handleClick} ><CartIcon style = {{display: 'block', width: '1.5em'}}></CartIcon>Cart {cartItemsNumber}</button>
  )
}

export default CartButton