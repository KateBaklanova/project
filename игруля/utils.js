
function rectangularCollision(rectangle1, rectangle2){
    return(
        rectangle1.attackBox.position.x+rectangle1.attackBox.width>=rectangle2.position.x
        && rectangle1.attackBox.position.x<=rectangle2.position.x+rectangle2.width
        && rectangle1.attackBox.position.y+rectangle1.attackBox.height>=rectangle2.position.y
        && rectangle1.attackBox.position.y<=rectangle2.position.y+rectangle2.height && rectangle1.isAttacking)
    }
let time = 31;
let timerId;

function determineWinner(timerId){
    clearTimeout(timerId)
    const result = document.querySelector('#result')
        if(player.health>enemy.health){
            result.innerHTML='player wins!'
            result.style.display='flex';
            console.log('player wins')
        }
        else if(player.health<enemy.health){
            result.innerHTML='enemy wins!'
            result.style.display='flex';
            console.log('enemy wins')
        }
        else{
            result.innerHTML='draw'
            result.style.display='flex';
            console.log('draw')
        }
        setTimeout(()=>{
            result.style.display='none';  
        }, 1000)
}

function decreaseTimer(){
    if (time>0)
    {
        time--
        document.querySelector('#time').innerHTML=time
        timerId = setTimeout(decreaseTimer, 1000)
    }
    else if (time===0){
      determineWinner(timerId)  
    }
}