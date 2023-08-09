import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/dinner.svg'
import CartButton from './UI/CartButton'
function Header() {
  return (
    <header className={styles.header}>
      <ul className={styles.links}>
      <li><img src={logo} alt="logo" className={styles.logoImg} /></li>
      <li><CartButton className='rounded-bell '>cart</CartButton></li>
      </ul>
    </header>
  )
}

export default Header