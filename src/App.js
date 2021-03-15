import Search from './components/Search';
import MovieInfo from './components/MovieInfo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Switch>
        <Route path='/info'>
          <MovieInfo />
        </Route>
        <Route path='/'>
          <Search />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
