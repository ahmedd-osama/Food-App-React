import styled from 'styled-components'

const  FormInputStyle = styled.div`
  position: relative;
  flex-basis: calc(50% - .5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  @media (max-width: 767px){
    flex-basis: 100%;
  }
  & input{
    width: calc(100% - 1rem);
    border: 1px solid ${props => {return props.isValid === true?'black':'red'}};
    background-color: ${props => {return props.isValid === true?'transparent':'#eb4c4c47'}};
    outline: none;
    border-radius: 0.6em;
    padding: .5em;
    color: black;
    font-size: 1.125rem;
  }
  & label{
    display: block;
    width: 100%;
    text-align: start;
    color: black;
    font-size: 1.125rem;
    white-space: pre-wrap;
    margin-bottom: auto;
  }
  & p.error-message{
    color: red;
    margin: 0;
    padding: 0;
    font-weight: 600;
    text-align: start;
    padding: 0 0.5em;
    width: 100%;
    height: 1.5em;
  }
`

export default FormInputStyle