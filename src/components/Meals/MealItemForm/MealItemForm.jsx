import React, {useRef, useState} from 'react'
import classes from './MealItemForm.module.css'
function MealItemForm({id, cartDispatch, value}) {
  const onAdd = () => { 
    cartDispatch({type: 'ADD', id: id})
   }
  const onRemove = () => { 
    cartDispatch({type: 'REMOVE', id: id})
   }
  const handleInput =(e) => { 
      cartDispatch({type: 'INPUT', id: id, inputValue: e.target.value})
  }
  return (
    <>
    <form className={classes['form']} onSubmit={(e)=>{e.preventDefault()}}>
      <div className={classes['input']}>
        <label htmlFor="">Amoutn:</label>
        <input type="number" name="" id="" placeholder='0' min='0' value = {value} onChange={handleInput} />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
      <button onClick={onRemove}>-</button>
      <button onClick={onAdd}>+</button>
      </div>
    </form>
    </>
  )
}

export default MealItemForm