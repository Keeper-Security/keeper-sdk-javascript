import React, {Component} from 'react';
import './App.css';
import {AuthContext, KeeperEnvironment, Vault} from "keeperapi";

interface AppState {
    status: string[];
    records: string[];
    loggedIn: boolean;
}

class App extends Component<{}, AppState> {

    private readonly userName: React.RefObject<any>;
    private readonly password: React.RefObject<any>;

    constructor(props: {}) {
        super(props);
        this.userName = React.createRef();
        this.password = React.createRef();
        this.state = {
            status: [],
            records: [],
            loggedIn: false
        }
    }

    async submit(e: any) {
        e.preventDefault();
        try {
            let auth = new AuthContext({
                username: this.userName.current["value"],
                password: this.password.current["value"],
                host: KeeperEnvironment.DEV
            });
            await auth.login();
            let newState = {...this.state};
            newState.status.push("Logged In");
            newState.loggedIn = true;
            this.setState(newState);
            let vault = new Vault(auth);
            await vault.syncDown();
            newState = {...this.state};
            newState.records = [...vault.records.map(x => JSON.stringify(x))];
            this.setState(newState);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="App">
                {
                    !this.state.loggedIn &&
                    <form onSubmit={e => this.submit(e)}>
                        <div>
                            <div>username:</div>
                            <input ref={this.userName}/>
                        </div>
                        <br/>
                        <div>
                            <div>password:</div>
                            <input type="password" ref={this.password}/>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                }
                <div className="data">
                    {this.state.status.map((x, i) => <div key={i}>{x}</div>)}
                    {this.state.records.map((x, i) => <div key={i}>{x}</div>)}
                </div>
            </div>
        );
    }
}

export default App;
