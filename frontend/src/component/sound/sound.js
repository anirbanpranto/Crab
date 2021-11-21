import React from 'react';
import a1 from './t-rex-roar.mp3'

function Sound() {
    const PlaySound = ()=>{
        const audio = new Audio(a1);
        audio.play();
    }
    return (
        <div>
            <button onClick={PlaySound}>Play Sound</button>
        </div>
    );
}

export default Sound;