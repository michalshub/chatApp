import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import {
    withRouter
} from 'react-router-dom';
import { setAllMessages } from '../Store/actions'
import { format } from "timeago.js";
import './desine.css';


const mapStateToProps = (state) => {
    return {
        customer: state.customerReducer.customer,
        allMessages: state.messageReducer.message.allMessages,
        socket: state.messageReducer.message.socket
    };
}
const mapDispatchToProps = (dispatch) => ({
    setAllMessages: (data) => dispatch(setAllMessages(data)),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Messages(props) {
    const { customer, allMessages, socket, setAllMessages, history } = props
const [cuurentRoom,setCuurentRoom]=useState('');
    const [messageTxt, setMessageTxt] = useState('');
    const [messageDt, setMessageDt] = useState('');


    const conId = history.location.pathname.split('/')[2];

    let txt = document.getElementById('messTxt');


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };


    useEffect(() => {
        console.log('useEffect');
        fetch(`http://localhost:3400/getMessagesByConversationId/${conId}`, requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(allMessages);
                setAllMessages(response);
                console.log(allMessages);
            })
            .catch(error => console.log('error', error));


            fetch(`http://localhost:3400/getCustomerRoomByConId/${conId}`, requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(cuurentRoom);
                setCuurentRoom(response);
                console.log(cuurentRoom);
            })
            .catch(error => console.log('error', error));

        socket.on("message", (event) => {

            let messagesTemp = { ...window.store.getState().messageReducer.message.allMessages };
            let messagesObject = [...window.store.getState().messageReducer.message.allMessages.messages];
            messagesObject.push(event);
            messagesTemp.messages = [...messagesObject];
            setAllMessages(messagesTemp);
        })

    }, [])

    function backToConversations() {
        if (customer.customerName !== 'Admin')
            history.push('/Customer');
        else
            history.push('/Admin');
    }

    function eventL(event) {
        if (event.code === 'Enter') {
            sendMessage();
            txt.value = '';
        }
    }


    function sendMessage() {
        const message = {
            messageText: messageTxt,
            messageDate: messageDt,
            messageWriter: customer.customerName,
            conId: conId,
            customerRoom: cuurentRoom.customerRoom
        }
        socket.emit('sendMessage', message);


    }

    return (
        <div >
            <h1 style={{ textAlign: "center" }}>hi {customer?.customerName},
                <br />
                Welcome To Live Chat </h1>
            <form className="rounded-top" style={{
                backgroundColor: "white", boxShadow: "5px 5px 2px grey", border: "#0E6C7D 2px solid",
                width: "300px", height: "450px", marginLeft: "70%",

            }}>
                <div style={{ backgroundColor: "#0E6C7D", height: "40px", color: "white" }}>
                    <p className="mx-4 mb-4" style={{ display: "inline-block" }}>Messages</p>
                    <svg onClick={backToConversations} style={{ cursor: "pointer", display: "inline-block", marginLeft: "30%" }} xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48">
                        <g>
                            <path id="path1" transform="rotate(0,24,24) translate(11,11.9749998450279) scale(0.8125,0.8125)  " fill="white" d="M25.399994,10.400033L32,16.60005 25.399994,23.000019 25.399994,18.599991 14,18.599991 14,14.800061 25.399994,14.800061z M0,0L22.200012,0 22.200012,11.800058 18.800018,11.800058 18.800018,3.2000146 3.2000122,3.2000146 3.2000122,26.400047 18.800018,26.400047 18.800018,21.400042 22.200012,21.400042 22.200012,29.6 0,29.6z" />
                        </g>
                    </svg>
                </div>






                {allMessages.messages?.length > 0 ?
                    <div style={{ overflow: "scroll", height: "420px", width: "300px" }}>
                        {


                            allMessages.messages.map((item, index) => (
                                <div key={index} style={{ padding: "10px" }}
                                >
                                    {item.messageWriter !== 'Admin' ?
                                        <div style={{
                                            direction: "rtl",
                                        }}  >
                                            <svg style={{ display: "inline-block" }} xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 48 48">
                                                <g>
                                                    <ellipse cy="24" cx="24" ry="24" rx="24" fill="#71C5CD" />
                                                    <path id="path1" transform="rotate(0,24,24) translate(11.3380002975464,11) scale(0.8125,0.8125)  " fill="#0E6C7D" d="M8.3560181,18.363037C10.371002,19.880005 12.873993,20.779053 15.584991,20.779053 18.295013,20.779053 20.799011,19.880005 22.813995,18.363037 27.524017,18.955994 31.167999,22.973022 31.167999,27.843994L31.167999,32 0,32 0,27.843994C0,22.973022,3.6459961,18.955994,8.3560181,18.363037z M15.584991,0C20.403992,0 24.311005,3.90802 24.311005,8.7280273 24.311005,13.548035 20.403992,17.454041 15.584991,17.454041 10.765015,17.454041 6.8580017,13.548035 6.8580017,8.7280273 6.8580017,3.90802 10.765015,0 15.584991,0z" />
                                                </g>
                                            </svg>
                                            <p className="rounded-right" style={{
                                                fontSize: "15px !important",
                                                display: "inline-block", backgroundColor: "lightblue", padding: "3px",
                                                background: "white",
                                                minWidth: "fit-content",
                                                padding: "10px",
                                                borderRadius: "10px",
                                                order: "1",
                                                borderBottomRightRadius: "0px important",
                                                boxShadow: "1px 2px 0px #d4d4d4",
                                            }}> {item.messageText}</p>
                                            {customer.customerName !== 'Admin' ?
                                                <div>
                                                    <div></div>
                                                    <p style={{ fontSize: "12px" }}>me * {format(item.messageDate)}</p>
                                                </div>
                                                :
                                                <p style={{ fontSize: "12px" }}>{item.messageWriter} * {format(item.messageDate)}</p>
                                            }
                                        </div>
                                        :
                                        <div style={{
                                            direction: "ltr",
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 48 48">
                                                <g>
                                                    <ellipse cy="24" cx="24" ry="24" rx="24" fill="#CBD0D1" />
                                                    <path id="path1" transform="rotate(0,24,24) translate(12.3194996714592,11) scale(0.8125,0.8125)  " fill="#0B8282" d="M14.119012,19.710999L15.833001,21.426003 14.501031,22.758003 15.874993,24.351006 14.057,29.802002 12.182977,24.414001 13.716974,22.738998 12.403009,21.426003z M21.350027,19.526001C25.562977,20.318001,28.752001,24.014,28.752001,28.456001L28.752001,32 0,32 0,28.456001C2.123852E-07,24.052002,3.134032,20.379005,7.2919891,19.546005L14.001031,30.062004z M11.89001,4.2109985C10.994014,4.2089996 9.8640096,4.439003 9.7319906,5.5890045 9.7319906,5.5890045 9.7319906,7.8209991 9.1359823,8.1190033L8.9880331,10.203003 8.3920248,9.6080017 8.6149862,12.436005 9.7319906,12.511002C9.7319906,12.511002 10.030024,18.241005 15.463006,17.125999 15.463006,17.125999 18.067985,16.306999 18.663017,12.511002L19.556997,12.436005 19.78002,9.9049988 19.40801,9.9800034C19.40801,9.9800034,19.184011,7.8209991,18.960989,6.9280014L18.812004,4.7700043C18.812004,4.7700043 17.546989,3.7280045 15.686028,4.6210022 15.686028,4.6210022 13.527033,4.5460052 13.005976,4.3230057 13.005976,4.3230057 12.502985,4.2130051 11.89001,4.2109985z M14.437005,0C16.973991,0 18.738029,1.3460007 18.738029,1.3460007 22.012991,3.951004 20.22698,8.4169998 20.22698,8.4169998 20.970999,8.862999 20.897024,9.2350006 20.897024,9.2350006 20.897024,14.074005 19.556997,13.701004 19.556997,13.701004 18.812004,16.828003 15.910026,18.241005 15.910026,18.241005 10.252986,19.656006 8.8389852,13.776001 8.8389852,13.776001 7.6480067,13.626999 7.4990199,10.873001 7.4990199,10.873001 7.1260345,9.012001 8.1690023,8.2680054 8.1690023,8.2680054 5.934995,3.0579987 9.9550121,1.4950027 9.9550121,1.4950027 11.565974,0.37000275 13.108026,0 14.437005,0z" />
                                                </g>
                                            </svg>


                                            <p style={{
                                                display: "inline-block", backgroundColor: "lightgray", padding: "3px",
                                                background: "white",
                                                minWidth: "fit-content",
                                                padding: "10px",
                                                borderRadius: "10px",
                                                order: "1",
                                                borderTopLeftRadius: "0px !important",
                                                boxShadow: "-1px 2px 0px #d4d4d4",
                                            }} className="rounded-right">{item.messageText}</p>
                                            {customer.customerName !== 'Admin' ?
                                                <p style={{ fontSize: "12px" }}>support * {format(item.messageDate)}</p>
                                                :
                                                <p style={{ fontSize: "12px" }}
                                                >me * {format(item.messageDate)}</p>
                                            }
                                        </div>
                                    }


                                </div>
                            ))
                        }
                    </div>
                    :
                    <>
                        <p>There is no messages yet, you can be the first!!!</p>
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

                <div id="inputDiv" className="mx-1 "
                    style={{
                        display: "grid",
                        gridRowStart: "190",
                        gridRowEnd: "190",
                    }}>

                    <textarea type="text" id="messTxt" className="form-control" placeholder="send a message"
                        style={{
                            width: "100%",
                            height: "50px",
                            background: "#fafafa",
                            border: "none",
                            outline: "none",
                            paddingLeft: "55px",
                            paddingRight: "55px",
                            color: "#666",
                            fontWeight: "400"
                        }}
                        onKeyDown={eventL}
                        onChange={(e) => {
                            setMessageTxt(e.target.value)
                            let today = new Date();
                            setMessageDt(today)

                        }} />
                </div>
            </form>

        </div >
    );
}))