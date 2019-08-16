import React from 'react';

function ChatItem(props){

    const {msg} = props;
    return<div className="bullet">
        {msg}
    </div>;

}

export default ChatItem;