import React, { Component } from 'react';
import { flowRight as compose } from 'lodash';
import { graphql } from '@apollo/react-hoc';
import { GET_GROUP_MEMBERS } from '../queries/queries';
import * as moment from 'moment';
import 'moment/locale/es';

class GroupMembersList extends Component {
    componentDidMount() {}

    BirthdayDate = (birthday) => {
        var m_birthday = moment(birthday, "DD-MM-YYYY");
        return m_birthday.format('LL');
    }

    TimeOfLife = (birthday) => {
        var m_birthday = moment(birthday, "DD-MM-YYYY");
        var m_today = moment();

        var diffInYears = m_today.diff(m_birthday, 'year');
        m_birthday.add(diffInYears, 'years')

        var diffInMonths = m_today.diff(m_birthday, 'month');
        m_birthday.add(diffInMonths, 'months')

        var diffInDays = m_today.diff(m_birthday, 'day');
        m_birthday.add(diffInDays, 'days')

        return diffInYears + ' años ' + diffInMonths + ' meses y ' + diffInDays + ' dias';
    }

    render(){
        const { loading, error, group } = this.props.GET_GROUPS_MEMBERS;
        
        if (loading) return 'Cargando...';
        if (error) return `Error! ${error.message}`;

        return (
            <div>
                <h1>{group.name}</h1>
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Fecha de Nacimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        group.members.map(
                            member => (
                                <tr key={member.id}>
                                    <td> {member.name}</td>
                                    <td> {this.TimeOfLife(member.birthday)}</td>
                                    <td> {this.BirthdayDate(member.birthday)}</td> 
                                </tr>
                            )
                        )
                    }
                </tbody>
                </table>
            </div>
        );
    }
}

export default compose(
    graphql(GET_GROUP_MEMBERS,{
        name: "GET_GROUPS_MEMBERS",
        options: (props) => {
            return {
                variables: {
                    groupId: props.groupId
                }
            }
        }
    })
)(GroupMembersList);
