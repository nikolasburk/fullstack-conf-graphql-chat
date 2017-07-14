import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './styles/index.css'
import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'


const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj53xiqyga8sy0196crc7flcf', {
  reconnect: true
})

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj53xiqyga8sy0196crc7flcf'
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,
  document.getElementById('root')
)
