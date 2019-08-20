import React, {useState} from 'react';


function SelectBar(props){
    const [value,setValue] = useState('');
    const {changeHandler} = props;
    return <span>
        <input value={value} onChange={e=>setValue(e.target.value)}/>
        <button onClick={changeHandler(value)}>
            choose
        </button>
    </span>
}


export default SelectBar;