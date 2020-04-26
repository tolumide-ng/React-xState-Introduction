import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from 'components/Home'
import Login from 'components/Login'
import { useMachine } from '@xstate/react'
import { appMachine, MachineContext } from 'state'
import {PrivateRoute} from 'components/PrivateRoute'

function App() {
    const [currentMachine, sendToMachine] = useMachine(appMachine)
        return (
        <MachineContext.Provider value={[currentMachine, sendToMachine]}> 
            <Router>
                <div className="App">
                    <Switch>
                        <Route path='/login'>
                            <Login/>
                        </Route>
                        <Route path='/'>
                                <PrivateRoute machine={currentMachine} path='/'>
                                    <Home />
                            </PrivateRoute>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </MachineContext.Provider>
  );
}

export default App;
