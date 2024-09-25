import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" exact to='/'>Media</NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item">
                <NavLink className="nav-link" activeClassName='active' exact to='/'>Activos</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" activeClassName='active' exact to='/genero'>Género</NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName='active' exact to='/tipo'>Tipo</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" activeClassName='active' exact to='/director'>Director</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" activeClassName='active' exact to='/productora'>Productora</NavLink>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
