import tmi from 'tmi.js';
import React,{useState, useEffect} from 'react';
import ChatItem from './chatItem';

function ChatContainer(props){
    const {channel} = props;

    const [msgList, setMsgList] = useState([]);
    const [counter, setCounter] = useState(0);
    const opts = {
        channels:[
            'disguisedtoast'
        ]
    
    }
    // Create a client with our options
    const [client] = useState(new tmi.client(opts));
    // Register our event handlers (defined below)
    useEffect(()=>{
        client.on('message', onMessageHandler);
        client.on('connected', onConnectedHandler);
        // Connect to Twitch:
        client.connect();
        
        return ()=>{
            client.disconnect();
        };
    },[]) 


    function onMessageHandler (target, context, msg, self) {
        if (self) { return; } // Ignore messages from the bot
        
        const newMsg = {};
        newMsg.id = counter;
        newMsg.sender = context;
        newMsg.message = msg;

        setCounter(counter+1);
        setMsgList(prev=>[...prev,newMsg]);
        console.log(msg);

      }
      
    return <div>
        {msgList.map((val,index)=><ChatItem key={index} msg={val.message}/>)}
    </div>;
}


export default ChatContainer;




// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}// Called every time a message comes in
