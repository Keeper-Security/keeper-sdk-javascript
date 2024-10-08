import React, {Component} from 'react'
import './App.css'
import {Auth, AuthUI, KeeperEnvironment, syncDown, VaultStorage, DRecord, Authentication} from '@keeper-security/keeperapi'
import LoginType = Authentication.LoginType;

interface AppState {
    status: string[];
    records: string[];
    twoFactor: boolean;
    loggedIn: boolean;
}

class App extends Component<{}, AppState> implements AuthUI {
    private readonly userName: React.RefObject<any>
    private readonly password: React.RefObject<any>
    private readonly twoFactorCode: React.RefObject<any>
    private twoFactorPromise: Promise<string>
    private twoFactorResolve?: (value: (PromiseLike<string> | string)) => void

    constructor(props: {}) {
        super(props)
        this.userName = React.createRef()
        this.password = React.createRef()
        this.twoFactorCode = React.createRef()
        this.twoFactorPromise = new Promise((resolve => {
            this.twoFactorResolve = resolve
        }))
        this.state = {
            status: [],
            records: [],
            twoFactor: false,
            loggedIn: false
        }
    }

    displayDialog(): Promise<boolean> {
        return Promise.resolve(false)
    }

    getTwoFactorCode(): Promise<string> {
        let newState = {...this.state}
        newState.status.push('Awaiting Two Factor...')
        newState.twoFactor = true
        this.setState(newState)
        return this.twoFactorPromise
    }

    async submit(e: any) {
        e.preventDefault()
        try {
            let auth = new Auth({host: KeeperEnvironment.DEV, authUI: this})
            let newState = {...this.state}
            newState.status.push('Logging In...')
            this.setState(newState)
            await auth.loginV3({ username: this.userName.current['value'], password: this.password.current['value'], loginType: LoginType.NORMAL})
            newState = {...this.state}
            newState.status.push('Logged In, querying records...')
            newState.loggedIn = true
            this.setState(newState)
            const records = [] as DRecord[]
            const storage = {} as VaultStorage
            await syncDown({
              auth,
              storage,
            })
            newState = {...this.state}
            newState.records = [...records.map(x => JSON.stringify(x))]
            this.setState(newState)
        } catch (e) {
            console.log(e)
        }
    }

    async submit2fa(e: any) {
        e.preventDefault()
        let newState = {...this.state}
        newState.status.push('Continue with Two Factor...')
        this.setState(newState)
        this.twoFactorResolve!(this.twoFactorCode.current['value'])
    }

    render() {
        return (
            <div className="App">
                <div className="content">
                    {
                        !this.state.loggedIn && !this.state.twoFactor &&
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
                    {
                        !this.state.loggedIn && this.state.twoFactor &&
                        <form onSubmit={e => this.submit2fa(e)}>
                            <div>
                                <div>Enter Code:</div>
                                <input ref={this.twoFactorCode}/>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    }
                    <br/>
                    <div className="data">
                        {this.state.status.map((x, i) => <div key={i}>{x}</div>)}
                        {this.state.records.map((x, i) => <div key={i}>{x}</div>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default App
