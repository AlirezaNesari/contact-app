import React from 'react'
import style from "./Header.module.css"

export default function Header() {
  return (
     <div className={style.container}>
        <h1>Contact App</h1>
        <p>
            <a href="botostart.ir">Botostart</a> |React js Foll Cours
        </p>
     </div>
  )
}
