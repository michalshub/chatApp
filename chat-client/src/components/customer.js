import React, { useState, useEffect } from "react";
import {
    withRouter,
    Link
} from 'react-router-dom';
import { connect } from 'react-redux'
import { format } from "timeago.js";
import './desine.css';

const mapStateToProps = (state) => {
    return {
        customer: state.customerReducer.customer
    };
}


export default withRouter(connect(mapStateToProps)(function Customer(props) {

    const { customer, history } = props

    const [openChat, setOpenChat] = useState(false);
    const [allConversations, setAllConversations] = useState([]);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    let cusMail = customer.customerMail;

    useEffect(() => {
        fetch(`http://localhost:3400/getConversationsByCustomerMail/${cusMail}`, requestOptions)
            .then(response => response.json())
            .then((response) => {
                ;
                console.log(allConversations);
                setAllConversations(response);
                console.log(allConversations);
            })
            .catch(error => console.log('error', error));

    }, [])

    function showMessages(conId) {
        history.push(`/messages/${conId}`);
    }

    function newConversation() {
        ;

        let conversation = {
            customerName: customer.customerName,
            conversationDate: new Date()
        }
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(conversation),
        };

        fetch("http://localhost:3400/newConversation", requestOptions)
            .then(response => response.json())
            .then((response) => {
                history.push(`/messages/${response.conversation._id}`)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>hi {customer?.customerName},
                <br />
                Welcome To Live Chat </h1>
            {
                openChat ?

                    <form className="rounded-top" style={{ backgroundColor: "white", boxShadow: "10px 10px 5px grey", marginLeft: "70%", width: "25%", height: "450px", border: "#0E6C7D 2px solid" }}>
                        <div style={{ backgroundColor: "#0E6C7D", height: "40px", color: "white" }}>
                            <p style={{ display: "inline-block" }} className="mx-4 mb-4">Conversations</p>
                            <svg onClick={newConversation} style={{ cursor: "pointer", marginLeft: "30%", display: "inline-block" }} xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48">
                                <g>
                                    <path id="path1" transform="rotate(0,24,24) translate(11,12.625) scale(0.8125,0.8125)  " fill="white" d="M15,4L17,4 17,9 22,9 22,11 17,11 17,16 15,16 15,11 10,11 10,9 15,9z M5,2C3.3459997,2,2,3.346,2,5L2,15C2,16.654,3.3459997,18,5,18L7,18C7.552,18,8,18.447,8,19L8,24.586 14.293,18.293C14.48,18.105,14.735,18,15,18L27,18C28.654,18,30,16.654,30,15L30,5C30,3.346,28.654,2,27,2z M5,0L27,0C29.757,0,32,2.243,32,5L32,15C32,17.757,29.757,20,27,20L15.414,20 7.7069998,27.707001C7.5159998,27.898001 7.2600002,28 7,28 6.8710003,28 6.7410002,27.976 6.6169996,27.924 6.2440004,27.77 6,27.403999 6,27L6,20 5,20C2.243,20,0,17.757,0,15L0,5C0,2.243,2.243,0,5,0z" />
                                </g>
                            </svg>
                        </div>

                        {(allConversations.conversations?.length > 0) ?
                            <div style={{ overflow: "scroll", height: "420px", width: "300px" }}>
                                {
                                    allConversations.conversations.map((item, index) => (
                                        <div key={index} className="scrollspy-example" data-bs-spy="scroll">
                                            <div onClick={() => showMessages(item._id)} style={{ cursor: "pointer", textAlign: "center", borderBottom: "1px solid black" }}>
                                                <h6>{item.customerName}</h6>
                                                <p style={{ fontSize: "12px" }}>{format(item.conversationDate)}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <>
                                <br />
                                <br />
                                <p>There is no conversations yet, to start - press on the icon above</p>
                                <div class="container-fluid">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="preloader1">
                                                    <div class="loader loader-inner-1">
                                                        <div class="loader loader-inner-2">
                                                            <div class="loader loader-inner-3">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                    </form>

                    :
                    <>
                        <div style={{ paddingLeft: "93%", paddingTop: "25%" }} onClick={() => { setOpenChat(true) }}>
                            <Link to="/Customer">

                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#0E6C7D" className="bi bi-chat-square-quote" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                                </svg>
                            </Link>
                        </div>
                    </>
            }
        </div>
    );
}))