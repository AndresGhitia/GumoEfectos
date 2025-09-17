import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { assets } from '../../assets/assets';

function Header() {
  return (
    <div className="hero-container">
      <img
        className="image-hero"
        src={assets.gumoefectos_hero1}
        alt="Hero Gumo Efectos"
      />

      <div className="hero-overlay-text">
        <h1>TRANSFERENCIA BANCARIA</h1>
        <div className="sale-details">
          <p>15% DE DESCUENTO</p>
        </div>
        <Link to="/pedals" className="hero-button">VER MAS</Link>
      </div>
    </div>
  );
}

export default Header;
