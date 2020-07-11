import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_GROUPS } from '../queries/queries';

const GroupList = ( props) => {
    const { loading, error, data } = useQuery(GET_GROUPS);
    
    if (loading) return 'Cargando...';
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            <h4>Grupos Existentes</h4>
            {
                data.groups.map(
                    g => (
                        <button
			  key={g.id}
			  onClick={() => props.onClickGroup(g.id)}
			  type="button"
			  className="btn btn-primary mx-1 my-1">
                            {g.name} <span className="badge badge-light">{g.members.length}</span>
                            <span className="sr-only">unread messages</span>
                        </button>
                    )
                )
            }
        </div>
    );
}

export default GroupList;
