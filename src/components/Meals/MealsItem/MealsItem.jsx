import React from 'react'
import classes from '../Meals.module.css'
function MealsItem({name, price, summary}) {
  return (
    <div className={classes['meal']}>
      <h3>{name}</h3>
      <div className={classes['description']}>{summary}</div>
      <div className={classes['price']}>{price}</div>
    </div>
  )
}

export default MealsItem