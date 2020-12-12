import logo from './logo.svg';
import './App.css';
import './styles/General.css';


/* import './logic/exceptions/Exception.js'; */
/* import {StringValidator,StringEmailValidator,ObjectValidator} from './logic/validators/index.js'; */

import StringValidator from './logic/validators/StringValidator.js';

import Landing from './components/Landing/Landing';

function App() {
    
    return (
        <Landing navigateComponent = 'login' />    

       /*
     <div></div> 
 */
    );


}

export default App;