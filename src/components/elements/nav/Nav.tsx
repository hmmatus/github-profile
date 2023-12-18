import React, { useState } from 'react';
import styles from './Nav.module.scss';
import CustomInput from '../inputs/CustomInput/CustomInput';

const Nav = () => {
  // * TODO ver de que manera enviar al seleccionar usuario de github recargar la pagina
  return (
    <nav className={styles.nav}>
      <CustomInput/>
    </nav>
  )
}

export default Nav;