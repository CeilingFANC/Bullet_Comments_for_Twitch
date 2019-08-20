import React, {useState} from 'react';
import './App.css';
import ChatContainer from './component/chatContainer';
import SelectBar from './component/input/selectBar';
function App() {
  const [channel, setChannel] = useState('');
  console.log(channel);
  return (
    <div className="App">
      
      <div>
        <SelectBar changeHandler={value=>()=>setChannel(value)} />
      </div>
      <ChatContainer channel={channel}/>


    </div>
  );
}

export default App;
