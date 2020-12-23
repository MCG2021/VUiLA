import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Dashboard from './components/pages/Dashboard/DashboardPage';
import SignUp from './components/pages/SignUp/SignUpPage';
import SignIn from './components/pages/SignIn/SignInPage';


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/'exact component={Home} />
        <Route path='/services' component={Services} />
        <Route path='/products' component={Products} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/sign-in' component={SignIn} />
        <Route path='/sign-up' component={SignUp} />
      
      </Switch> 
    </Router>
    </>
    /*
    <div className="App">
      <Navbar />
      <h1> Hello World</h1>
    </div>
     
    */
  );
}

export default App;
