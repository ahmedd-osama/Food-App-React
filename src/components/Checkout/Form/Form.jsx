import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import FormStyle from './FormStyle'
import FormInput from './FormInput/FormInput'
import FormAction from './FormAction/FormAction'
import useForm from '../../../hooks/use-form'
import CartContext from '../../../context/CartContext'
function validateText (value){
  if(!(value && value?.trim().length>0)){
    return 'Please fill out this field'
  }
  if(value?.trim() == 'ahmed'){
    return 'cannot be ahmed'
  }
  return true;
}
function Form(){
  const setIsOpen = useContext(CartContext).setIsOpen
  const setCheckout = useContext(CartContext).setCheckout
  const initialFieldsEntries = [{
  name: 'name',
  type: 'text',
  label: 'Name:',
  errorMessage: '',
  initialValue: '',
  validate: validateText
},{
  name: 'yearlySavings',
  type: 'number',
  label: 'Yearly Savings  ($)',
  errorMessage: '',
  initialValue: '',
},{
  name: 'expectedROI',
  type: 'number',
  label: 'Expected Return on investment (%)',
  errorMessage: '',
  initialValue: '',
},{
  name: 'investmentOutPation',
  type: 'number',
  label: 'Investment OutPation  (Years)',
  errorMessage: '',
  initialValue: '',
}]
  const [fields, setfields] = useState(initialFieldsEntries)
  const {allFieldsEntries, isValid, dispatch, formValues : formValue} = useForm(fields)
  console.log(allFieldsEntries)
  // Submit
  const handleSubmit = (e) => { 
    e.preventDefault()
    dispatch({type: 'CHECK'})
    isValid? console.log('valid'):''
  }
  // go back
  const handleGoBack = (e) => { 
    setIsOpen(true)
    setCheckout(false)
  }
  return (
    <FormStyle  isValid = {isValid}  onSubmit = {handleSubmit}>
      {allFieldsEntries.map(entry=> <FormInput type = {entry.type} value = {formValue[entry.name]} name = {entry.name} dispatch = {dispatch} label = {entry.label}  errorMessage = {entry.errorMessage} key = {entry.name} isValid={entry.isValid === undefined? true : entry.isValid}></FormInput>)}
      <FormAction>
        <button type="button" onClick = {handleGoBack}>go back</button>
        <button type="submit" > Checkout</button>
      </FormAction>
    </FormStyle>
  )
}

export default Form