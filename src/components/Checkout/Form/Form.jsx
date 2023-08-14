import React, {useState, useContext, useMemo, useEffect} from 'react'
import styled from 'styled-components'
import FormStyle from './FormStyle'
import FormInput from './FormInput/FormInput'
import FormAction from './FormAction/FormAction'
import useForm from '../../../hooks/use-form'
import CartContext from '../../../context/CartContext'
import useHTTP from '../../../hooks/use-http'
import SuccessMessage from './Messages/SuccessMessage'
import FailMessage from './Messages/FailMessage'
function validateText (value){
  if(!(value && value?.trim().length>0)){
    return 'Please fill out this field'
  }
  return true;
}
function validateEmail (value){
  if(!(value && value?.trim().length>0)){
    return 'Please fill out this field'
  }
  const emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!emailregex.test(value)){
    return 'Please enter a valid email adress.'
  }
  return true;
}
function validatePhone (value){
  if(!(value && value?.trim().length>0)){
    return 'Please fill out this field'
  }
  // const phoneRegex = /^(?:\+|\d)?[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  if (isNaN(value)){
    return 'Please enter a valid Phone Number'
  }
  return true;
}

function Form(){
  // context data 
  const setIsOpen = useContext(CartContext).setIsOpen
  const setCheckout = useContext(CartContext).setCheckout
  const cartItems = useContext(CartContext).items
  const getTotalPrice = useContext(CartContext).getTotalPrice
  const cartDispatch = useContext(CartContext).cartDispatch
  const [messageHolder, setMessageHolder] = useState()
  // using useForm hook to manage the form inputs
  const initialFieldsEntries = [{
  name: 'name',
  type: 'text',
  label: 'Name:',
  errorMessage: '',
  initialValue: '',
  validate: validateText,
  
},
  {
    name: 'email',
    type: 'text',
    label: 'Email Adress:',
    validate: validateEmail,
    dispatchType: 'BLUR_INPUT'
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone Number:',
    validate: validatePhone
  },{
    name: 'adress',
    type: 'text',
    label: 'Delevery Adress:',
    validate: validateText
  }
]
  const fields = useMemo(()=>{return initialFieldsEntries}, [])
  const {allFieldsEntries, isValid, dispatch, formValues : formValue, checkAllForm} = useForm(fields)

  // useHTTP to send checkout info
  const sendCheckoutOptions = useMemo(() => {
    return {
      URL: "https://caramel-comfort-295623-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      method: "POST",
      body: {orderItems: cartItems, totalPrice: getTotalPrice(), checkoutInfo: formValue}
    };
  }, [cartItems, getTotalPrice, formValue]);
  const {sendRequest: sendOrder} = useHTTP(sendCheckoutOptions)
  // Submit
  const handleSubmit = (e) => { 
    e.preventDefault()
    // dispatch({type: 'CHECK'})
    if (checkAllForm()){
      console.log(isValid)
      sendOrder().then(res=>{
        cartDispatch({type: 'RESET'})
        setMessageHolder(<SuccessMessage/>)
      }).catch((err)=>{setMessageHolder(<FailMessage/>)})
    }
  }
  // go back
  const handleGoBack = (e) => { 
    setIsOpen(true)
    setCheckout(false)
  }
  return (
    <>
    {!messageHolder && 
    <FormStyle  isValid = {isValid}  onSubmit = {handleSubmit}>
    {allFieldsEntries.map(entry=> <FormInput type = {entry.type} value = {formValue[entry.name]} name = {entry.name} dispatch = {dispatch} label = {entry.label}  errorMessage = {entry.errorMessage} key = {entry.name} dispatchType = {entry.dispatchType? entry.dispatchType : 'INPUT'} isValid={entry.isValid === undefined? true : entry.isValid}></FormInput>)}
    <FormAction>
      <button type="button" onClick = {handleGoBack}>go back</button>
      <button type="submit" > Checkout</button>
    </FormAction>
    </FormStyle>
    }
    {messageHolder && messageHolder}
    </>
  )
}

export default Form