import React, { Component } from 'react';

class IconSelector extends Component{
    handleOnClick = (e) => {
        console.log('handle: ' + e.target.src);
        this.props.handleClick(e.target.src);
    }

    render(){
        let iconDaughter = `${process.env.PUBLIC_URL}/images/icons/031-newborn.png`;
        let iconDad = `${process.env.PUBLIC_URL}/images/icons/031-father.png`;
        let iconMom = `${process.env.PUBLIC_URL}/images/icons/031-mother.png`;

        return (
            <div className="alert alert-info">
                <h6>Seleccione icono</h6>
                <button 
                    type="button" 
                    className="btn btn-default p-0"
                    value={iconDaughter}
                    onClick={this.handleOnClick}
                >
                    <img src={iconDaughter} alt="daughter" width="32px"/>
                </button>

                <button 
                    type="button" 
                    className="btn btn-default p-0"
                    value={iconDad}
                    onClick={this.handleOnClick}
                >
                    <img src={iconDad} alt="dad" width="32px"/>
                </button>

                <button 
                    type="button" 
                    className="btn btn-default p-0"
                    value={iconMom}
                    onClick={this.handleOnClick}
                >
                    <img src={iconMom} alt="dad" width="32px"/>
                </button>

            </div>
        );
    }
}

export default IconSelector;
