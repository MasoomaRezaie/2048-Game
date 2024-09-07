'use strict'
const tblRows = Array.from(document.querySelectorAll('tr'));
let score= document.querySelector('#score');
let best= document.querySelector('#best');
let newScore= document.getElementById('new-score');
let newGamebtn= document.querySelector('#new-game');
let howToPlaybtn= document.querySelector('#how-to-play');
let howToModal= document.querySelector('#how-to-model');
let resultModal= document.querySelector('#result-model');
let arr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let td, sound;
function random(min, max) {            //------------------generate random number----------------------------  
    return Math.floor(Math.random() * (max+1 - min)) + min;
} 
function randomNumGenerator(){         //------------------generate random number and random place for it----
    let randomNum = random(1,2) * 2;
    let [a,b] = [random(0,3),random(0,3)];
    if(arr[a][b]===0) arr[a][b]=randomNum;
    else randomNumGenerator();
    handler()
}
function handler(){                    //------------------pastes numbers from array into table--------------
    for(let tr in tblRows){
        td = Array.from(tblRows[tr].children);
        for(let i=0; i<=3; i++){
            if(arr[tr][i] === 0){
                td[i].textContent='';
                if(td[i].textContent==0) td[i].style.backgroundColor='#faebd733';
            }
            else {
                td[i].classList.add('full');
                td[i].textContent=arr[tr][i];
                if(td[i].textContent==2) td[i].style.backgroundColor='#f3f0a9';
                else if(td[i].textContent==4) td[i].style.backgroundColor='#ede06c';
                else if(td[i].textContent==8) td[i].style.backgroundColor='#e8ff04d1';
                else if(td[i].textContent==16) td[i].style.backgroundColor='#90e929';
                else if(td[i].textContent==32) td[i].style.backgroundColor='#66dd6b';
                else if(td[i].textContent==64) td[i].style.backgroundColor='#31ebad';
                else if(td[i].textContent==128) td[i].style.backgroundColor='#82cee9';
                else if(td[i].textContent==256) td[i].style.backgroundColor='#008af7';
                else if(td[i].textContent==512) td[i].style.backgroundColor='#1307ff';
                else if(td[i].textContent==1024) td[i].style.backgroundColor='#243593';
                else if(td[i].textContent==2048) td[i].style.backgroundColor='#010e53';
            }
        }
    }
}
function userInputHandler(a,b,x,indexArr){//---------------transfers numbers in four direction using user input
    failureChecker();
    let delItemIndex;
    let moveCounter=0;
    for(let i=a; i<=3; i++){
        for(let j of indexArr){
            if(arr[i][j]!==0 && arr[i][j]===(arr[i][j+(1*x)] || arr[i][j+(2*x)] || arr[i][j+(3*x)])){
                if(x==+1){delItemIndex=arr[i]?.slice(j+1)?.indexOf(arr[i][j])+(4-arr[i]?.slice(j+1)?.length);}
                else{delItemIndex=arr[i]?.slice(0,j)?.lastIndexOf(arr[i][j]);}
                arr[i][delItemIndex]=0;
                arr[i][j]*=2;
                score.textContent = Number(score.textContent)+arr[i][j];
                sound= new Audio('scripts/sound-1-167181.mp3');
                moveCounter++;
                break;
            }
        }
    }
    for(let i=a; i<=3; i++){
        for(let j of indexArr){
            if(arr[i][j]===0 && (arr[i][j+(1*x)] || arr[i][j+(2*x)] || arr[i][j+(3*x)])){
                arr[i][j]=(arr[i][j+(1*x)] || arr[i][j+(2*x)] || arr[i][j+(3*x)]);
                if(x==+1){delItemIndex=arr[i]?.slice(j+1)?.indexOf(arr[i][j])+(4-arr[i]?.slice(j+1)?.length);}
                else{delItemIndex=arr[i]?.slice(0,j)?.lastIndexOf(arr[i][j]);}
                arr[i][delItemIndex]=0;
                moveCounter++;
            }
        }
    }
    handler();
    if(moveCounter>0) {
        sound= new Audio('scripts/sound-1-167181.mp3');
        sound.play();
        randomNumGenerator();
    }
}
function arrInverser(arr){             //------------------inverses column into rows-------------------------
    let resultArr=[];
    for(let i=0; i<=3; i++){
        let newArr=[];
        for(let j=0; j<=3; j++){
            newArr[j]=arr[j][i];
        }
        resultArr[i]=newArr;
    }
    return resultArr;
}
function failureChecker(){             //------------------checks if the user has faild----------------------
    let isfaild=true;
    let highstArrNumber=0;
    let arrInverse=arrInverser(arr);
    for(let i=0; i<=3; i++){
        for(let j=0; j<=3; j++){
            if(arr[i][j]>highstArrNumber) highstArrNumber=arr[i][j];
            if((arr[i][j]!==0 && arr[i][j]===(arr[i][j+1] || arr[i][j+2] || arr[i][j+3])) || arr[i].includes(0)
            || (arrInverse[i][j]!==0 && arrInverse[i][j]===(arrInverse[i][j+1] || arrInverse[i][j+2] || arrInverse[i][j+3]))
            || arrInverse[i].includes(0)) isfaild=false;
        }
    }
    if(isfaild==true) {
        if(Number(best.textContent)<Number(score.textContent)) best.textContent=Number(score.textContent);
        score.textContent='0';
        sound= new Audio('scripts/negative_beeps-6008.mp3');
        sound.play();
        document.querySelector('#message').textContent='You are faild! DO you want to play again?';
        resultModal.style.display= 'block';
        document.getElementById('clse-resultModal').onclick =function(){
            resultModal.style.display= 'none';
        }
        window.onclick = function(event){
            if(event.target == resultModal){
                resultModal.style.display= 'none';
            }
        }
        document.querySelector('#yes').addEventListener('click', function(){
            newGameGenerator();
            resultModal.style.display= 'none';
        })
        document.querySelector('#no').addEventListener('click', function(){
            resultModal.style.display= 'none';
        })
    }
    if(highstArrNumber===2048){
        sound= new Audio('scripts/success-fanfare-trumpets-6185.mp3');
        sound.play();
        document.querySelector('#message').textContent='Conglraclation!🎉 you win.\n Do You want to continue?';
        resultModal.style.display= 'block';
        document.getElementById('clse-resultModal').onclick =function(){
            resultModal.style.display= 'none';
        }
        window.onclick = function(event){
            if(event.target == resultModal){
                resultModal.style.display= 'none';
            }
        }
        document.querySelector('#yes').addEventListener('click', function(){
            resultModal.style.display= 'none';
        })
        document.querySelector('#no').addEventListener('click', function(){
            newGameGenerator();
            resultModal.style.display= 'none';
        })
    }
}
function newGameGenerator(){           //------------------New game------------------------------------------
    arr= [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    score.textContent='0';
    handler();
    randomNumGenerator();
    randomNumGenerator();
}
document.addEventListener('keydown', function(e){
    switch(e.key){
        case 'ArrowRight':
            userInputHandler(0,3,-1,[3,2,1,0]);
            break;
        case 'ArrowLeft':
            userInputHandler(0,0,+1,[0,1,2,3]);
            break;
        case 'ArrowUp':
            arr= arrInverser(arr);
            userInputHandler(0,0,+1,[0,1,2,3]);
            arr=arrInverser(arr);
            handler()
            break;
        case 'ArrowDown':
            arr= arrInverser(arr);
            userInputHandler(0,3,-1,[3,2,1,0]);
            arr=arrInverser(arr);
            handler()
            break;
    }
})
newGamebtn.addEventListener('click', newGameGenerator);
howToPlaybtn.addEventListener('click', function(){        //------------------generate modal------------------------------------
    howToModal.style.display= 'block';
    document.getElementById('clse-howToModal').onclick =function(){
        howToModal.style.display= 'none';
    }
    window.onclick = function(event){
        if(event.target == howToModal){
            howToModal.style.display= 'none';
        }
    }
    document.querySelector('#ok').addEventListener('click', function(){
        howToModal.style.display= 'none';
    })
});
randomNumGenerator();
randomNumGenerator();