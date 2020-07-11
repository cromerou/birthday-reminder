import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { GET_MEMBERS } from '../queries/queries';
import { flowRight as compose } from 'lodash';

class MemberList extends Component {
    componentDidMount() {}

    render(){
        const { loading, error, members } = this.props.GET_MEMBERS;
        
        if (loading) return 'Cargando...';
        if (error) return `Error! ${error.message}`;

        return (
            <div>
                <h1>Personas</h1>
                <ul className="list-group" id='member-list'>
                {
                    members.map(
                        member => (
                            <a href="/" key={member.id} className="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-info">
                                {member.name} - {member.id}
                            </a>
                        )
                    )
                }
                </ul>
            </div>
        );
    }
}

export default compose(
    graphql(GET_MEMBERS, {name: 'GET_MEMBERS' })
)(MemberList);
