import tmi from 'tmi.js';
import React,{useState, useEffect, useCallback, useRef} from 'react';
import ChatItem from './chatItem';
const Twitch = window.Twitch;
function ChatContainer(props){
    const {channel} = props;
    
    const [msgList, setMsgList] = useState([]);
    const [indices, setIndices] = useState([]);
    const [counter, setCounter] = useState(0);
    const [startPositions,setStartPositions] =useState([]);
    const opts = {
        channels:[
            channel
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

    //load player
    useEffect(()=>{
        var options = {
            width: 800,
            height: 600,
            channel: channel,
            video: "<video ID>",
            collection: "<collection ID>",
          };
          var player = new Twitch.Player("player1", options);
          player.setVolume(0.5);
    },[]) 
    function onMessageHandler (target, context, msg, self) {
        if (self) { return; } // Ignore messages from the bot
        
        const newMsg = {};
        newMsg.id = counter;
        newMsg.sender = context;
        newMsg.message = msg;

        setCounter(counter+1);
        setIndices(prev=>[...prev,prev.length+1]);
        setMsgList(prev=>[...prev,newMsg]);
        setStartPositions(prev=>[...prev,randomLocation(15,85)])
        //console.log(msg);
        //console.log(context)

      }
      
    return <div className="video-container">
        <div id="player1"></div>
        <div className="comment-layer">
            <CommentsView msgList={msgList} indices={indices} startPositions={startPositions}/>
        </div>
    </div> ;
}


export default ChatContainer;



function CommentsView(props){
    const {msgList, indices, startPositions} = props;
    const [max, setMax] = useState({max:-1,nextMax:-1});
    const duration = 10;
    
    //console.log("view "+max.max+" "+max.nextMax);
    
    //ref to store props for access in callback
    const me = useRef(props);
    useEffect(()=>{
        me.current = props;
    });
    const temp = useCallback(
        ()=>{
            setMax(prev=>{
                const t = {max:prev.nextMax,nextMax:me.current.indices.length}
                return t;
            });
        },
    )
    useEffect(()=>{
        setInterval(temp,duration*1000)
    },[]);
    return <div>
        {msgList.map((val,index)=>index<=max.max?"":<ChatItem key={indices[index]} y={startPositions[index]} msg={val.message} duration={duration}/>)}
    </div>
}




//integer expected
function randomLocation(yStart,yEnd){

    return Math.floor(Math.random()*(yEnd-yStart)+yStart);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}// Called every time a message comes in
