import React from 'react'
import styles from "./Header.module.css"
import Logo from "../../Assets/logo.png"

const Header = () => {
  return (
    <nav className={styles.navbar}>
        <div className="container">
            <div className={styles.navbar_content}> 
                <img width={296} height={41} src={Logo} alt="" />
                <form className={styles.form_control}>
                    <input type="text" placeholder='Search' name="" id="" />
                    <button type='submit' >Send</button>
                </form>
            </div>
        </div>
    </nav>
  )
}

export default Header