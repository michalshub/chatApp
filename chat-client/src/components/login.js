import React, { useState, useEffect } from "react";
import {
    withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import { setCustomerName, setCustomerMail, setCustomerRoom } from '../Store/actions'

const mapStateToProps = (state) => {
    return {
        customer: state.customerReducer.customer,
        socket: state.messageReducer.message.socket
    };
}
const mapDispatchToProps = (dispatch) => ({
    setCustomerName: (name) => dispatch(setCustomerName(name)),
    setCustomerMail: (mail) => dispatch(setCustomerMail(mail)),
    setCustomerRoom: (room) => dispatch(setCustomerRoom(room)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Login(props) {

    const { customer, socket, setCustomerName, setCustomerMail, setCustomerRoom, history } = props
    const [existCustomer, setExistCustomer] = useState(false);
    const [loginCustomer, setLoginCustomer] = useState(false);

    let lResponse = false;
    let eResponse = false;

    let loginCustomerTemp = false;
    let existCustomerTemp = false;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const customerDetails = {
        "customerName": customer.customerName,
        "customerMail": customer.customerMail,
        "customerRoom": customer.customerRoom
    }
    useEffect(() => {
        setCustomerName('');
        setCustomerMail('');
        setCustomerRoom('');
    }, [])

    function login() {

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(customerDetails),
        };

        fetch("http://localhost:3400/isLoginCustomer", requestOptions)
            .then((response) =>
                response.json()
            )
            .then((response) => {
                lResponse = response;
                if (lResponse.result === true) {
                    loginCustomerTemp = true;
                    setLoginCustomer(true);
                }

                if (loginCustomerTemp) {
                    socket.emit('login', customer.customerRoom);

                    if (customer.customerName === 'Admin') {
                        history.push('/Admin')
                    }
                    else
                        history.push('/Customer');

                }
            })
            .catch(error => console.log('error', error));


        var requestOptions3 = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(customerDetails),
        };

        fetch("http://localhost:3400/isExistCustomer", requestOptions3)
            .then((response) => {
                return response.json();


            })
            .then((response) => {
                eResponse = response;

                console.log(response);
                console.log(response);
                if (eResponse.result === true) {
                    existCustomerTemp = true;
                    setExistCustomer(true);
                }


                if ((!existCustomerTemp) && (customer.customerMail !== '') && (customer.customerName !== '') && (customer.customerRoom !== '')) {
                    ;


                    var requestOptions2 = {
                        method: 'POST',
                        headers: myHeaders,
                        body: JSON.stringify(customerDetails),
                    };

                    fetch("http://localhost:3400/createCustomer", requestOptions2)
                        .then(response => response.json())
                        .then(() => {
                            history.push('/Customer');
                        })
                        .catch(error => console.log('error', error));

                }
                else {
                    if (!loginCustomerTemp)
                        alert('these customer details are not allowd!')
                }
            })
            .catch(error => console.log('error', error));







    }


    return (
        <div className="container">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div id="loader4">
                            <span className="loader loader-1"></span>
                            <span className="loader loader-2"></span>
                            <span className="loader loader-3"></span>
                            <span className="loader loader-4"></span>
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
            <div className="row">
                <div className="col-3">

                </div>
                <div className="col-6">
                    <form>
                        <h1 style={{ textAlign: "center" }}>hi {customer?.customerName},
                            <br />
                            Welcome To Live Chat </h1>                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" onChange={(e) => setCustomerName(e.target.value)} />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Mail</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setCustomerMail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Room Number</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setCustomerRoom(e.target.value)} />
                        </div>

                    </form>
                    <button className="btn btn-primary" style={{ backgroundColor: "#0E6C7D" }} onClick={login}>Login</button>

                </div>

            </div >

        </div >


    )
}))
