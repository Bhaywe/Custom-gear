import Navbar from  './Components/Navbar';
import Home from './Components/Home';
import TableauClients from './Components/TableauClients';
import AjouterClient from './Components/AjouterClient';
import ModifierClient from './Components/ModifierClient';
import ModifierVoiture from './Components/ModifierVoiture'
import NotFound from './Components/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/all" component={TableauClients} exact />
        <Route path="/add" component={AjouterClient} exact />
        <Route path="/modifier/client/:id" component={ModifierClient} exact />
        <Route path="/modifier/voiture/:id" component={ModifierVoiture} exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
