import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { flowRight as compose } from 'lodash';
import { GET_GROUPS, ADD_GROUP_MUTATION } from '../queries/queries';

import IconSelector from './IconSelector';
import ColorSelector from './ColorSelector';

class AddGroup extends Component{

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            NameSelected: '',
            IconSelected: "/images/icons/031-portrait.png",
            ColorSelected: "#eaeaea"
        };
    }

    SelectNewName = (e) => {
        let newName = e.target.value;
        this.setState({ NameSelected: newName });
    } 

    SelectNewIcon = (newIcon) => {
        this.setState({IconSelected: newIcon});
    }

    SelectNewColor = (newColor) => {
        this.setState({ColorSelected: newColor});
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.ADD_GROUP_MUTATION({
            variables:{
                name: this.state.NameSelected,
                icon: this.state.IconSelected,
                color: this.state.ColorSelected
            },
            refetchQueries: [{ query: GET_GROUPS }]
        });
    }

    componentDidMount() {
        let dpLibraryScript = document.createElement("script");

        // Hook Sources.
        dpLibraryScript.src = `${process.env.PUBLIC_URL}/js/AddMember.js`;
        //dpLibraryScript.src = `https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/js/bootstrap-datepicker.min.js`;
        
        // Persist order of Loading.
        dpLibraryScript.async = false;
    
        // Append to index.html
        document.body.appendChild(dpLibraryScript);
    }

    render(){

        const { loading, error, groups } = this.props.GET_GROUPS;

        if (loading) return 'Cargando Grupos...';
        if (error) return `Error! ${error.message}`;

        return (
            <div>
                <h4>Grupos Existentes</h4>
                <ul className="list-group">
                    {
                        groups.map(
                            g => (
                                <li key={g.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {g.name}
                                    <span className="badge badge-primary badge-pill">0</span>
                                </li>
                            )
                        )
                    }
                </ul>
                &nbsp;
            <div className="border p-3">
                <h4>Nuevo Grupo</h4>
                <hr />
                <form onSubmit={this.submitForm.bind(this)}>
                <div className="form-group row">
                    <label htmlFor="inputName" className="col-sm-3 col-form-label">Nombre</label>
                    <div className="col-sm-9">
                    <input 
                        type="text" 
                        value={this.state.NameSelected} 
                        onChange={this.SelectNewName}
                        className="form-control" 
                        id="inputName"
                    />
                    </div>
                </div>
  
                <div className="form-group row">
                    <label htmlFor="inputIcon" className="col-sm-3 col-form-label">Icono</label>
                    <div className="col-sm-9">
                        <button
                            id="inputIcon"
                            type="button" 
                            className="btn btn-default p-0"
                            value={this.state.IconSelected}
                        >
                            <img src={this.state.IconSelected} alt="Icono" width="32px"/>
                        </button>
                    </div>
                </div>
                <IconSelector handleClick={this.SelectNewIcon} />

                <div className="form-group row">
                    <label htmlFor="inputColor" className="col-sm-3 col-form-label">Color</label>
                    <div className="col-sm-9">
                        <button
                            id="inputColor"
                            type="button" 
                            className="square"
                            style={{ backgroundColor: this.state.ColorSelected }}
                            value={this.state.ColorSelected}
                        >
                            &nbsp;
                        </button>
                    </div>
                </div>
                <ColorSelector handleClick={this.SelectNewColor} />

                <div className="form-group row">
                    <div className="col-sm-9">
                    <button type="submit" className="btn btn-primary">Crear</button>
                </div>
                </div>
            </form>
            </div>
            </div>
        );
    }
}

export default compose(
    graphql(GET_GROUPS, {name: "GET_GROUPS"}),
    graphql(ADD_GROUP_MUTATION, {name: "ADD_GROUP_MUTATION"})
)(AddGroup);
