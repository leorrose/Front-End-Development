
/* collection of keys and thier sounds*/
let audioTypes = new Map([["a","clap"], ["s","hihat"], ["d","kick"],
 ["f","openhat"], ["g","boom"], ["h","ride"], ["j","snare"], ["k","tom"], ["l","tink"]]);


function playAudio(soundType){
    /**
     * function to play the drum sound of given sound type and change its div style.
     * @param {string} soundType 
    */
    let audioPlayer = document.getElementById(soundType + "-player");
    if(!audioPlayer){
        return;
    }
    let divPlayer = document.getElementById(soundType + "-div");
    let divPlayerClassList = divPlayer.classList
    audioPlayer.currentTime = 0;
    audioPlayer.play()
    divPlayer.classList += " playing";
}
function playAudioByButton(e){
    /**
     * function to play the drum sound of pressed key.
     * @param {Event} e 
    */
    let keyPressed = String.fromCharCode(e.keyCode).toLowerCase();
    playAudio(audioTypes.get(keyPressed));
}

function playAudioByclick(e){
    /**
     * function to play the drum sound of clicked element.
     * @param {Event} e 
    */
    playAudio(e.target.getAttribute("data-sound"));
}

function removeTransition(e){
    /**
     * function to remove the changed style added in playAudio.
     * @param {Event} e
    */
    e.target.classList.remove("playing");
}

/* add addEvent Listener for key down to play sounds */
document.addEventListener("keydown",playAudioByButton);

/* add to all drum divs the removeTransition event*/
document.querySelectorAll('.drum-kit-inner-elem').forEach(x => {
    x.addEventListener("transitionend", removeTransition)
    x.addEventListener("click", playAudioByclick, true)
});
