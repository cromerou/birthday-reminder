import React, { Component } from 'react';
import NavBar from './NavBar';
import GroupList from './GroupList';
import GroupMembersList from './GroupMembersList';
import AddGroup from './AddGroup';
import EditGroup from './EditGroup';

export default class HomeScreen extends Component {
  state = {
    sectionDisplayed: 'VER_MIEMBROS',
    groupDisplayed: '5e9a6f2dd78b794634d4056a'
  };
  
  handleClickChangeSection = (sectionName) => {
    const updatedState = {...this.state}
    updatedState.sectionDisplayed = sectionName;
    this.setState(updatedState);
  }

  handleClickGroup = group => {
    const updatedState = {...this.state}
    updatedState.groupDisplayed = group;
    this.setState(updatedState);
  };

  render() {
    return (
      <div>
	<NavBar onClickChangeSection={this.handleClickChangeSection} />
	<GroupList onClickGroup={this.handleClickGroup} />
	
	{ this.state.sectionDisplayed === 'VER_MIEMBROS' && (
	    <GroupMembersList groupId={this.state.groupDisplayed} />
	)}

	{this.state.sectionDisplayed === 'CREAR_GRUPO' && (
	  <AddGroup />
	)}

	{this.state.sectionDisplayed === 'MODIFICAR_GRUPO' && (
	  <EditGroup />
	)}
      </div>
    )
  }
}
