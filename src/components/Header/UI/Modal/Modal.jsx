import Reactfrom from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

function ModalComponent({children, isOpen, setIsOpen}) {
  return (
    <>
    {isOpen && 
    <div className={styles.backdrop} onClick={()=>{setIsOpen(false)}}>
        <div className={styles.modal} onClick={e=>e.stopPropagation()}>
          {children}
        </div>
      </div>}
    </>
    
  )
}
function Modal ({children, isOpen, setIsOpen}){

  return(
    <>
    {ReactDOM.createPortal(<ModalComponent children={children} isOpen={isOpen} setIsOpen={setIsOpen}/>, document.getElementById('modal-portal') )}
    </>
  )
}
export default Modal