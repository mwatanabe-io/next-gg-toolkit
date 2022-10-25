import React from 'react'
import styles from '../../styles/Footer.module.css'

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>© {new Date().getFullYear()} Mitsutoshi Watanabe</footer>
    </>
  )
}

export default Footer
