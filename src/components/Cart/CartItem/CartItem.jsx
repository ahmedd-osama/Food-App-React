import React from 'react'
import classes from './CartItem.module.css'
import formateUSD from '../../../Helpers/Formaters'
function CartItem({name, amount, cartDispatch, price , id }) {
  const onAdd = () => { 
    cartDispatch({type: 'add', id: id})
   }
  const onRemove = () => { 
    cartDispatch({type: 'remove', id: id})
   }
  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{formateUSD(price)}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  )
}

export default CartItem