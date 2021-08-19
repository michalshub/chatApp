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


export default withRouter(connect(mapStateToProps)(function Support(props) {

    const { customer, history } = props

    const [openConversation, setOpenConversation] = useState(false);
    const [allConversations, setAllConversations] = useState([]);
    const [allCustomers, setAallCustomers] = useState([]);


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };


    useEffect(() => {
        var requestOptions1 = {
            method: 'POST',
            headers: myHeaders,
        };
        fetch("http://localhost:3400/getAllCustomers", requestOptions1)
            .then(response => response.json())
            .then(response => {
                ;
                setAallCustomers(response);
                console.log(allCustomers);
            })
            .catch(error => console.log('error', error));

    }, [])

    function fetchConversation(cusMail) {
        console.log(cusMail);
        fetch(`http://localhost:3400/getConversationsByCustomerMail/${cusMail}`, requestOptions)
            .then(response => response.json())
            .then((response) => {
                ;
                console.log(allConversations);
                setAllConversations(response);
                console.log(allConversations);
            })
            .then(() => {
                setOpenConversation(true);
            })
            .catch(error => console.log('error', error));
    }

    function showMessages(conId) {
        history.push(`/messages/${conId}`);
    }

    function backToCustomers() {
        setOpenConversation(false)
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>hi {customer?.customerName},
                <br />
                Welcome To Live Chat </h1>

            <form className="rounded-top" style={{ marginLeft: "70%", width: "25%", height: "450px", border: "#0E6C7D 2px solid" }}>

                <div style={{ backgroundColor: "#0E6C7D", height: "40px", color: "white" }}>
                    <p style={{ display: "inline-block" }} className="mx-4 mb-4">Conversations</p>
                    {openConversation ?

                        <svg onClick={backToCustomers} style={{ cursor: "pointer", display: "inline-block", marginLeft: "30%" }} xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48">
                            <g>
                                <path id="path1" transform="rotate(0,24,24) translate(11,11.9749998450279) scale(0.8125,0.8125)  " fill="white" d="M25.399994,10.400033L32,16.60005 25.399994,23.000019 25.399994,18.599991 14,18.599991 14,14.800061 25.399994,14.800061z M0,0L22.200012,0 22.200012,11.800058 18.800018,11.800058 18.800018,3.2000146 3.2000122,3.2000146 3.2000122,26.400047 18.800018,26.400047 18.800018,21.400042 22.200012,21.400042 22.200012,29.6 0,29.6z" />
                            </g>
                        </svg>
                        :
                        <>
                        </>
                    }
                </div>

                {
                    openConversation === false ?
                        <div style={{ overflow: "scroll", height: "420px", width: "300px" }}>

                            {
                                allCustomers.customers?.length > 0 ?
                                    <>

                                        {
                                            allCustomers.customers.map((item, index) => (
                                                <div key={index}>

                                                    <div style={{ cursor: "pointer", textAlign: "center" }} onClick={() => fetchConversation(item.customerMail)}>
                                                        {item.customerName !== 'Admin' ?
                                                            <div style={{ boxShadow: "1px 1px 0px #d4d4d4", }}>
                                                                <h6 >{item.customerName}</h6>
                                                            </div>
                                                            :
                                                            <>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                    :
                                    <>
                                        <p>search for customers</p>
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
                        </div>
                        :
                        <>
                        </>
                }

                {openConversation === true ?
                    <>
                        {allConversations.conversations?.length > 0 ?
                            <>

                                {
                                    allConversations.conversations.map((item, index) => (
                                        <div key={index}>
                                            <div style={{ cursor: "pointer" }} onClick={() => showMessages(item._id)}>
                                                {item.customerName !== 'Admin' ?
                                                    <div>
                                                        <h6>{item.customerName}</h6>
                                                        <p style={{ fontSize: "12px" }}>{format(item.conversationDate)}</p>
                                                    </div>
                                                    :
                                                    <>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                            :
                            <>
                                <p>There is no conversations yet.</p>
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
                    </>
                    :
                    <>
                    </>
                }

            </form>


        </div>
    );
}))