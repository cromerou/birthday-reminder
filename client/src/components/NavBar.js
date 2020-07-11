import React from 'react';

function NavBar( props ){
    return (
        <div className="mt-3 mb-3">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" href="/">Home</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">Acciones</a>
                    <div className="dropdown-menu">
		      <a className="dropdown-item" onClick={() => {
			  console.log(props); props.onClickChangeSection('VER_MIEMBROS');
			}
		      }>Ver Miembros</a>
		    <a className="dropdown-item" onClick={() => props.onClickChangeSection('CREAR_GRUPO')}>Crear Grupo</a>
		      <a className="dropdown-item" onClick={() => props.onClickChangeSection('MODIFICAR_GRUPO')}>Modificar Grupo</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/">Separated link</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href=".">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="/" tabIndex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
