import React, { Component } from 'react'
import '../styles/App.css'
import generateStupidName from 'sillyname'
import Chat from './Chat'
import {graphql, gql} from 'react-apollo'

const CHAT_USER_NAME_KEY = 'CHAT_USER_NAME'
const CHAT_USER_ID_KEY = 'CHAT_USER_ID'

class App extends Component {

  async componentWillMount() {
    let name = localStorage.getItem(CHAT_USER_NAME_KEY)
    if (!name) {
      name = generateStupidName()
      const personData = await this.props.mutate({
        variables: {name}
      })
      localStorage.setItem(CHAT_USER_NAME_KEY, personData.data.createPerson.name)
      localStorage.setItem(CHAT_USER_ID_KEY, personData.data.createPerson.id)
      this.forceUpdate()
    }
  }
  render() {
    const name = localStorage.getItem(CHAT_USER_NAME_KEY)
    const userId = localStorage.getItem(CHAT_USER_ID_KEY)

    if (!userId) {
      return <div>Creating user...</div>
    }

    return (
      <Chat name={name} userId={userId} />
    )
  }
}


const CREATE_PERSON_MUTATION = gql`
  mutation CreatePersonMutation($name: String!) {
    createPerson(name: $name) {
      id
      name
    }
  }
`

export default graphql(CREATE_PERSON_MUTATION)(App)