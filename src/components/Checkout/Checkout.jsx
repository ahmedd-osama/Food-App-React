import React, {useContext} from 'react'
import CartContext from '../../context/CartContext'
import Modal from '../Header/UI/Modal/Modal' 
import Form from './Form/Form'
function Checkout() {
  const checkout = useContext(CartContext).checkout
  const setCheckout = useContext(CartContext).setCheckout
  return (
    <Modal setIsOpen={setCheckout} isOpen = {checkout}>
      <Form />

    </Modal>
  )
}

export default Checkout