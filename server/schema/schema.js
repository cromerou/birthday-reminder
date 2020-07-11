const graphql = require('graphql');
const _ = require('lodash');

const Member = require('../models/member');
const Group = require('../models/group');

const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//dummy data
/*
var familyMembers = [
    {
        id: '1',
        name: 'Camila Belen',
        lastName: 'Arias Carrasco',
        birthday: '01-05-1996',
        sex: 'Femenino',
        icon: 'url/location.png',
        color: '#eaeaea',
        groupId: '2',
    },
    {
        id: '2',
        name: 'Cesar Guillermo',
        lastName: 'Romero URibe',
        birthday: '28-10-1989',
        sex: 'Masculino',
        icon: 'url/location.png',
        color: '#800022',
        groupId: '1'
    },
    {
        id: '3',
        name: 'Antonia',
        lastName: 'Romero Molina',
        birthday: '09-11-2017',
        sex: 'Femenino',
        icon: 'url/location.png',
        color: '#802020',
        groupId: '1'
    }
]

var groups = [
    {
        id: '1',
        name: 'Mi Familia',
        icon: 'url/location.png',
        color: '#ececec'
    },
    {
        id: '2',
        name: 'Familia de mi Polola',
        icon: 'url/location.png',
        color: '#ececec'
    }
]
*/


const MemberType = new GraphQLObjectType({
    name : 'Member',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        lastName: { type: GraphQLString },
        birthday: { type: GraphQLString },
        sex: { type: GraphQLString },
        icon: { type: GraphQLString },
        color: { type: GraphQLString },
        group: {
            type: GroupType,
            resolve(parent, args){
                return Group.findById(parent.groupId);
                //return _.find(groups, {id: parent.groupId});
            }
        }
    })
});

const GroupType = new GraphQLObjectType({
    name : 'Group',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        icon: { type: GraphQLString },
        color: { type: GraphQLString },
        members: {
            type: new GraphQLList(MemberType),
            resolve(parent, args){
                return Member.find({groupId: parent.id})
                //return _.filter(familyMembers, {groupId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        member: {
            type: MemberType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //code to get data from db/ other source
                //return _.find(familyMembers, {id: args.id});
                return Member.findById(args.id);
            }
        },
        group: {
            type: GroupType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //code to get data from db/ other source
                //return _.find(groups, {id: args.id});
                return Group.findById(args.id);
            }
        },
        members: {
            type: new GraphQLList(MemberType),
            resolve(parent, args){
                //return familyMembers;
                return Member.find({});
            }
        },
        groups: {
            type: new GraphQLList(GroupType),
            resolve(parent, args){
                //return groups;
                return Group.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMember: {
            type: MemberType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                birthday: {type: new GraphQLNonNull(GraphQLString)},
                sex: {type: new GraphQLNonNull(GraphQLString)},
                icon: {type: new GraphQLNonNull(GraphQLString)},
                color: {type: new GraphQLNonNull(GraphQLString)},
                groupId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let member = new Member({
                    name: args.name,
                    lastName: args.lastName,
                    birthday: args.birthday,
                    sex: args.sex,
                    icon: args.icon,
                    color: args.color,
                    groupId: args.groupId
                });

                return member.save();
            }
        },
        addGroup: {
            type: GroupType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                icon: {type: new GraphQLNonNull(GraphQLString)},
                color: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let group = new Group({
                    name: args.name,
                    icon: args.icon,
                    color: args.color
                });

                return group.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});