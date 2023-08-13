import styled from 'styled-components'

const  FormStyle = styled.form`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-radius: 0.6em;
  padding: 1em;
  border: ${props => {return props.isValid === true?'0px solid transparetn':'1px solid red'}};
`

export default FormStyle