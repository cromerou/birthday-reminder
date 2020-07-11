import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { GET_MEMBERS } from '../queries/queries';

class AddMember extends Component{
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
        const { loading, error, data } = this.props;
        console.log(data);
        if (loading) return 'Cargando Grupos...';
        if (error) return `Error! ${error.message}`;

        return (
            <div>
            <form>
                <div className="form-group row">
                    <label htmlFor="inputName" className="col-sm-3 col-form-label">Nombres</label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" id="inputName" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputLastName" className="col-sm-3 col-form-label">Apellidos</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="inputLastName"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputBirthday" className="col-sm-3 col-form-label">Fecha de Nacimiento</label>
                    <div className="col-sm-9">
                        <input 
                        type="text" 
                        className="form-control datepicker" 
                        data-date-format="dd-mm-yyyy"
                        id="inputBirthday" 
                        readOnly
                        />
                    </div>
                </div>
                <fieldset className="form-group">
                    <div className="row">
                        <legend className="col-form-label col-sm-3 pt-0">Sexo</legend>
                        <div className="col-sm-9">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridSexo" id="gridSexoFemenino" value="Femenino" defaultChecked/>
                            <label className="form-check-label" htmlFor="gridSexoFemenino">
                            Femenino
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridSexo" id="gridSexoMasculino" value="Masculino"/>
                            <label className="form-check-label" htmlFor="gridSexoMasculino">
                            Masculino
                            </label>
                        </div>
                        <div className="form-check disabled">
                            <input className="form-check-input" type="radio" name="gridSexo" id="gridSexoOtro" value="Otro"/>
                            <label className="form-check-label" htmlFor="gridSexoOtro">
                            Otro
                            </label>
                        </div>
                        </div>
                    </div>
                </fieldset>
                <div className="form-group row">
                    <label htmlFor="inputIcon" className="col-sm-3 col-form-label">Icono</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="inputIcon"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputColor" className="col-sm-3 col-form-label">Color</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="inputColor"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputColor" className="col-sm-3 col-form-label">Grupo</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="inputGrupo"/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-9">
                    <button type="submit" className="btn btn-primary">Crear</button>
                </div>
                </div>
            </form>
            
            </div>
        );
    }
}

export default graphql(GET_MEMBERS)(AddMember);
