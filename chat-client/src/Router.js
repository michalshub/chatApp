import React from 'react';
import {
    Switch,
    Route,
    Link,
    withRouter
} from 'react-router-dom';
import Support from './components/support';
import Customer from './components/customer';
import Messages from './components/messages';
import Login from './components/login';
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        customer: state.customerReducer.customer
    };
}


export default withRouter(connect(mapStateToProps)(function RouterPage(props) {

    const { customer } = props
    return (
        <div style={{ backgroundColor: "rgb(231, 231, 250)", color: "#0E6C7D" }}>
            <Menu />
            <Switch>
                {customer?.customerName !== '' ?
                    <Route path="/Admin">
                        <Support />
                    </Route>
                    :
                    <Route path="/">
                        <Login />
                    </Route>
                }
                {customer?.customerName !== '' && customer?.customerMail !== '' && customer?.customerRoom !== '' ?
                    <Route path="/Customer">
                        <Customer />
                    </Route>
                    :
                    <Route path="/">
                        <Login />
                    </Route>
                }
                {customer?.customerName !== '' && customer?.customerMail !== '' && customer?.customerRoom !== '' ?
                    <Route path="/Messages/:conId">
                        <Messages />
                    </Route>
                    :
                    <Route path="/">
                        <Login />
                    </Route>
                }
                <Route path="/Login">
                    <Login />
                </Route>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>
        </div>
    );
}
))

function Menu() {
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ color: "#0E6C7D", direction: "rtl" }}>
                <div className="navbar-nav">
                    <Link className="nav-link active" aria-current="page" to="/Login">Login</Link>
                </div>
            </nav>
        </>
    );
}