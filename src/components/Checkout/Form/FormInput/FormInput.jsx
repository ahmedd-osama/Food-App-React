import React from 'react'
import FormInputStyle from './FormInputStyle'
function FormInput({type, errorMessage, label, value, dispatch, name, isValid, dispatchType}) {
  const handleInput = (e) => { 
    dispatch({
      type: dispatchType,
      field: e.target.name,
      value: e.target.value
    })
  }
  const handleBlur = (e) => { 
    dispatch({
      type: 'VALIDATE_INPUT',
      field: e.target.name,
      value: e.target.value
    })
  }
  return (
    <FormInputStyle className="form-control" isValid ={isValid} >
    <label htmlFor="form-input">{label} </label>
    <input type= {type} value = {value} name = {name} onChange={e=>handleInput(e)} onBlur={handleBlur}>
      
    </input>
    <p className="error-message"> {errorMessage}</p>
    </FormInputStyle>
  )
}

export default FormInput