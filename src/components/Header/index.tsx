import React from "react";
import styles from './index.scss'

const Header = ({ title }:any) => {
  return <h1 className={ styles.h1Css }>{ title }</h1>
}

export default Header