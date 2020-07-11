import React, { Component } from 'react';

class ColorSelector extends Component{
    state = {
        colors: [
            "#F78181", 
            "#FA8258",
            "#FAAC58",
            "#DF7401",
            "#F3F781",
            "#81F781",
            "#CEF6F5",
            "#01DFA5",
            "#A9BCF5",
            "#E2A9F3",
            "#F5A9D0"
        ]
    }

    handleOnClick = (e) => {
        console.log('handle color: ' + e.target.value);
        this.props.handleClick(e.target.value);
    }

    render(){
        return (
            <div className="alert alert-info">
                <h6>Seleccione color</h6>

                {this.state.colors.map(
                    (c) => (
                        <button
                            key={c}
                            type="button" 
                            className="square"
                            style={{ backgroundColor: c }}
                            value={c}
                            onClick={this.handleOnClick}
                        >
                            &nbsp;
                        </button>

                    )
                )}
            </div>
        );
    }
}

export default ColorSelector;
