import React, {useState, useReducer, useEffect } from "react";

const useForm = (fieldsEntries) => { 
  const [isValid, setIsValid] = useState(true)
  const [allFieldsEntries, setAllFieldsEntries] = useState(fieldsEntries)

  // setting FormValue state with useReducer hook
  const initialFormValue = {}
  useEffect(() => {
  // this will only run once when the component is first rendered
    allFieldsEntries.forEach(entry=>{initialFormValue[entry.name] = entry.initialValue? entry.initialValue : ''})
  }, [fieldsEntries])

  // managing form values
  const [formValue, dispatch] = useReducer(reducer, initialFormValue)
  function reducer (formValue,{ type ,value, field}) { 
    type = type.trim()
    if(type === 'INPUT'){
      if(checkFormInput(value, field)){
        const newFormValue = {...formValue , [field]: value }
        return (newFormValue);
      }
    }else if (type === 'CONDITIONAL_INPUT'){
      if(checkFormInput(value, field, true)){
        const newFormValue = {...formValue , [field]: value }
        return (newFormValue);
      }
    }else if(type === 'RESET'){
      setAllFieldsEntries(fieldsEntries)
      allFieldsEntries.forEach(entry=>{initialFormValue[entry.name] = entry.initialValue})
      return initialFormValue;
    }else if(type === 'CHECK'){
      allFieldsEntries.forEach(entry=>checkFormInput(formValue.name,entry.name))
      // checking if all values of the form are set to true in the allFormEntries state and returning the results
      let allFormIsValid = allFieldsEntries.reduce((a,b)=> {
        const aIsValid = a.isValid !== undefined ? a.isValid : true
        const bIsValid = b.isValid !== undefined ? b.isValid : true
        return aIsValid && bIsValid} , true)
        console.log(allFormIsValid)
      setIsValid(allFormIsValid)
    }
    return({...formValue})
  }

  // error handling functions
  function checkFormInput(value,field, conditionalInput = false){ 
    const updatedFieldsEntries = allFieldsEntries
    let inputValidation = true
    allFieldsEntries.forEach((entry,i)=>{
      if(entry.name === field){
        if(entry.validate){
          const validationResult = updatedFieldsEntries[i].validate(value) // should return either (true) or ("error message") 
          if ( validationResult === true){
            updatedFieldsEntries[i].errorMessage = ''
            updatedFieldsEntries[i].isValid = true
          }else{
            updatedFieldsEntries[i].errorMessage = validationResult // to assign the error message returned from the validate function
            updatedFieldsEntries[i].isValid = false
          }
          // updating allFieldsEntries
          setAllFieldsEntries(updatedFieldsEntries)
          // check if te input is conditional and return (true,false) according to the result of validation
          if (conditionalInput && (validationResult !== true)){
            console.log(validationResult !== true)
            inputValidation = false
          }
        }
      }
    })
    // in case there is a validation method that return  an invalid value and it's needed to prevent the userInput this function should false instead of true 
    return inputValidation
  }

  console.log('===useForm===')
  return {allFieldsEntries, isValid, formValues: formValue, dispatch}
}

  export default useForm