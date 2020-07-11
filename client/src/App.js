import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
//import './App.scss';

//components
//import GroupMembersList from './components/GroupMembersList';
////import AddMember from './components/AddMember';
//import GroupList from './components/GroupList';
////import AddGroup from './components/AddGroup';
//import NavBar from './components/NavBar';
//import IconSelector from './components/IconSelector';
import HomeScreen from './components/HomeScreen';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client} >
      <div className="App container-fluid">
	<HomeScreen />
      </div>
    </ApolloProvider>
  );
}

export default App;
