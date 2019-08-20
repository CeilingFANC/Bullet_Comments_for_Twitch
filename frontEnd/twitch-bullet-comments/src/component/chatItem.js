import React, {memo} from 'react';
import styled, {keyframes} from 'styled-components';



const ChatItem=memo(({msg,y, duration})=>{
    const fly = keyframes`
        from {
            transform: translateX(10%); 
            left: 100%;
        }

        to {
            left: 0;
            transform: translateX(-100%); 
            display:none;
        }

    `
    const Box = styled.div`
        animation:${fly} ${duration}s linear ;
        position:absolute;
        top:${y+'%'};
        transform: translateX(-100%); 
        color:white ;
        white-space:nowrap;
        z-index: 9001 !important;
    `
    //console.log('fuck');



    return <Box>
            {msg}
        </Box>
        
    ;

});

export default ChatItem;