import React, { useRef, useContext} from 'react'
import { MachineContext } from 'state'
import {Redirect} from 'react-router-dom'

const Login = () =>{
    const userRef = useRef();
    const passwordRef = useRef();
    const [machine, sendToMachine] = useContext(MachineContext);
    const {error} = machine.context


    const doLogin = e => {
        e.preventDefault();
        const username = userRef.current.value;
        const password = passwordRef.current.value;

        sendToMachine('LOGIN', { username, password });
    }


    return (
        <div>
            <h1>
                Login
            </h1>
            <form onSubmit={doLogin}>
                <div>
                    <input type='text' placeholder='username' ref={userRef} defaultValue='hello' />
                </div>
                <div>
                    <input type='password' placeholder='password' ref={passwordRef} defaultValue='123' />
                </div>

                <button >Login</button>
            </form>
            {/* {machine.value} */}
            {machine.matches('auth.fail') && (<div>
                <h2 style={{color: 'red', fontSize: '12px'}}>{error.toString()}</h2>
            </div>)}
            {machine.matches('auth.success') && <Redirect to='/' />}
        </div>
    )
}

export default Login