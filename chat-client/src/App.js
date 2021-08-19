import './App.css';
import { hot } from 'react-hot-loader/root';
import {Provider} from 'react-redux';
import RouterPage from './Router';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './Store/store';

function App() {
  return (
    <Provider store={store}>
   <Router>
     <div>
       <RouterPage></RouterPage>
     </div>
   </Router>
   </Provider>
  );
}

export default hot(App);
