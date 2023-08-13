import React , {useState, useEffect}from 'react'
const useCounter  = (incrementalValue = 1, initialValue = 0 , span = 1000) => { 
  const [counter, setCounter] = useState(initialValue)
  useEffect(
    ()=>{
      const interval = setInterval(( ) => { 
        setCounter(prev=> prev + incrementalValue);
      }, span)
      return ( () => { clearInterval(interval) })
    }
    ,[incrementalValue, span, initialValue  ]
  )
  return counter
}
  export default useCounter