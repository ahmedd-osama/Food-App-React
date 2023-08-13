import React, {useState, useCallback } from 'react'

function useHTTP(options = {}) {
  let {method , headers, body, URL} = options
  
  // states
  // const [response, setResponse] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // sending HTTP request
  const REQUEST = useCallback( async()=>{
    try {
      // initializing states
      setError(false);
      setIsLoading(true);
      // fetching from api
      let response = await fetch(URL, {
        method: method,
        headers: headers? headers : {},
        body: body? JSON.stringify(body) : null
      })
      setIsSent(true)
      // handling response satus
      if (!response.ok) {
        throw new Error("THE RESPONSE IS NOT OK!");
      }
      console.log('-----response from useToDo -------')
      console.log(response)
      let Data = await response.json();
      // setResponse(Data);
      return Data;
    } catch (err) {
      setError(true);
      console.log(err)
    }
    setIsLoading(false);
  },[options])
  // return {response, isLoading, error, isSent, sendRequest: REQUEST} removed respnse 
  return { isLoading, error, isSent, sendRequest: REQUEST}
}

export default useHTTP