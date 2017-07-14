import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './styles/index.css'
import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

// looks like: wss://subscriptions.graph.cool/v1/<project-id>
const subscriptionsUrl = ''

// looks like: https://api.graph.cool/simple/v1/<project-id>
const graphQLEndpoint = ''

const subscriptionsClient = new SubscriptionClient(subscriptionsUrl, {
  reconnect: true,
})

const networkInterface = createNetworkInterface({
  uri: graphQLEndpoint
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  subscriptionsClient
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
