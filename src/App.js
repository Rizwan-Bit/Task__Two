import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Models from './components/Models'
import Configure from "./components/Configure";
import SaveModel from "./components/SaveModel"

function App() {
  return (
            <BrowserRouter>
                  <Switch> 
                          <Route path="/" exact component={Models} />          
                          <Route path="/configure" exact component={Configure} />          
                          <Route path="/save" exact component={SaveModel} />          
                  </Switch>
            </BrowserRouter>
  );
}
export default App;