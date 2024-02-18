import "./App.css";
import Admin from "./Admin/Admin"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const App = () => {
  const client = new ApolloClient({
    uri: '/graphql/',
    cache: new InMemoryCache(),
    
  });
  
  return (
    
    <ApolloProvider client={client}>
      <Admin />
    </ApolloProvider>
  );
};


export default App;