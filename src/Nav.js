import React from 'react'
import { useEffect, useState } from 'react';
import './Nav.css';
export default function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() =>  {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        });

        return () => {
            window.removeEventListener("scroll");
        };
    },[])
  return (
      <div className={`nav ${show && "nav__black"}`}>
          <img className='nav__logo'
              src='https://logowik.com/content/uploads/images/750_netflix.jpg'
              alt='Netflix logo'
          />
      </div>
  )
}
