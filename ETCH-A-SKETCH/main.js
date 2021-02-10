function createInnerDivs(num){
    /**
     * function to add to main-div num divs in each num row.
     * @param {Number} num 
    */
    let div = undefined;
    let mainDiv = document.getElementById("main-div");
    mainDiv.style.gridTemplateColumns = "1fr ".repeat(num);
    mainDiv.style.gridTemplateRows = "1fr ".repeat(num);
    let containerWidth = mainDiv.clientWidth;
    let containerheight = mainDiv.clientWidth;
    for(let i=0; i<num; i++){
        for(let j=0; j<num; j++){
            div = document.createElement("div");
            div.classList = "inner-div";
            div.addEventListener("mouseover",addColor);
            div.addEventListener("touchstart",addColor);
            div.addEventListener("touchmove",addColor);
            mainDiv.appendChild(div);
        }
    }
}

function addColor(e){
    /**
     * function to add selcted color to element e.
     * @param {Event} e 
    */
    let color = document.getElementById("color-input").value;
    e.target.style.background = color;
}

function removeAllChilds(){
    /**
     * function to remove all divs from main-div.
    */
    let mainDiv = document.getElementById("main-div"); 
    while(mainDiv.firstChild){
        console.log(1);
        mainDiv.removeChild(mainDiv.firstChild);
    }
}

function createNewGrid(){
    /**
     * function to create new sizes sketch.
    */
    let size = window.prompt("Enter Sketch size (a whole number):",16);
    if (size <=0 || !Number.isInteger(size)) {
        size = 16;
    }
    removeAllChilds();
    createInnerDivs(size);
}

function resetGrid(){
    /**
     * function to clean sketch.
    */
    let mainDiv = document.getElementById("main-div");
    for(let item of mainDiv.childNodes){
        item.style.background = "#ffffff";
    }
}

document.getElementById("new-sketch").addEventListener("click", createNewGrid);
document.getElementById("reset-sketch").addEventListener("click", resetGrid);
createInnerDivs(16);