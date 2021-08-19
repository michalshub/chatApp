export function setCustomerName(name) {
    return { type: "SET_CUSTOMER_NAME", payload: name }
}

export function setCustomerMail(mail) {
    return { type: "SET_CUSTOMER_MAIL", payload: mail }
}

export function setCustomerRoom(room) {
    return { type: "SET_CUSTOMER_ROOM", payload: room }
}

export function setConversations(con) {
    return { type: "SET_CONVERSATIONS", payload: con }
}

export function setConversationId(id) {
    return { type: "SET_CONVERSATION_ID", payload: id }
}

export function setAllMessages(messages) {
    return { type: "SET_ALL_MESSAGES", payload: messages }
}

