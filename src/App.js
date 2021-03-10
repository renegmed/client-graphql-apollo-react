import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import {
  ApolloClient, 
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from, 
} from "@apollo/client"; 
import { onError } from "@apollo/client/link/error";
import SongList from "./components/SongList";
import SongDetail from "./components/SongDetail";
import SongCreate from "./components/SongCreate";
 

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map( (message, location, path) => {
      console.log(`Graphql error \n\tmessage: ${message} \n\tlocation: ${location} \n\tpath: ${path}`);
      return "";
    });
  }
});

const link = from([
  errorLink,  
  new HttpLink({uri: "https://localhost:8080/query"}),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return <ApolloProvider client={client}> 
  <>
  
     <Router>
       <Link to="/">Home</Link>
       <Link to="/songs/new">Add Song</Link>
       <Switch>
          <Route path="/" exact render={ () => <SongList /> } /> 
          <Route path="/songs/new" exact render={ () => <SongCreate /> } /> 
          <Route path="/songs/:id" exact render={ () => <SongDetail /> } />   
       </Switch>
       
      </Router>
  </>
  </ApolloProvider>;
}

export default App;
