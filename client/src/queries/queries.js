import { gql } from 'apollo-boost';

const GET_GROUPS = gql`
{
    groups{
        name
        id
	members {
	  id
	  name
	}
    }
}
`;

const GET_MEMBERS = gql`
{
    members{
        id
        name
        lastName
        birthday
        sex
        icon
        color
    }
}
`;

const GET_GROUP_MEMBERS = gql`
    query($groupId: ID!){
        group(id: $groupId){
            id
            name
            members{
                id
                name
                lastName
                birthday
                sex
                icon
                color
            }
        }
        
    }
`;

const ADD_GROUP_MUTATION = gql`
    mutation($name: String!, $icon: String!, $color: String!){
        addGroup(name: $name, icon: $icon, color: $color){
            name
            id
        }
    }
`;

export{ GET_GROUPS, GET_MEMBERS, GET_GROUP_MEMBERS, ADD_GROUP_MUTATION};
