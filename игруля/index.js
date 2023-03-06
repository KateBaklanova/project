const canvas = document.querySelector('canvas') // кладем элемент canvas из html файла
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// Метод fillRect() рисует "залитый" прямоугольник. Цвет заливки, по умолчанию, черный.
// context.fillRect(x, y, width, height)

c.fillRect(0,0, canvas.width, canvas.height)

const gravity = 0.7
 // чтобы было что-то типа ускорения

const background = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: "img/Background.png"
})

const shop = new Sprite({
    position:{
        x: 100,
        y: 270
    },
    imageSrc: "img/Drone11.png",
    scale: 1.2,
    frames: 6
})
const player = new Fighter( // creates object of the class Sprite
{
    position: {
        x: 0, // this is position passed to the function as an object
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    color:'green',
    offset:{
        x:0,
        y:0
    },
    imageSrc: "img/Martial Hero 2/Sprites/Idle.png",
    frames: 4
}
)


console.log(player) // чтобы отобразить информацию в консоли

const enemy = new Fighter({
    position:
    {
        x:400,
        y:100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color:'blue',
    offset:{ //нужно для атаки
        x:50,
        y:0
    }
}
)


console.log(enemy)


decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate) // infinite animation
    c.fillStyle='black' // иначе зальет все красным, тк это был последний fillStyle назначенный нами
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    enemy.update()

    // для играка движение по горизонтали
    player.velocity.x=0
    if(keys.d.pressed && player.lastKey === 'd') // см. eventListener 'd'
        player.velocity.x=5
    else if (keys.a.pressed && player.lastKey === 'a')
        player.velocity.x=-5

    // для врага движение по горизонтали
    enemy.velocity.x=0
    if(keys.ArrowRight.pressed && enemy.lastKey==='ArrowRight')
        enemy.velocity.x=5
    else if(keys.ArrowLeft.pressed && enemy.lastKey==="ArrowLeft")
        enemy.velocity.x=-5

    if(rectangularCollision(player, enemy)){ // зачем тут он ставил скобочки фигурные
            player.isAttacking=false // чтобы удар был произведен 1 раз
            enemy.health-=20; // изначальное значение = 100, потом понижается до 80, 60... переводим это в проценты +'%' и назначаем для шкалы
            document.querySelector('#enemyHealth').style.width=enemy.health+'%' 
            console.log('go')
        }
    if(rectangularCollision(enemy, player)){ // зачем тут он ставил скобочки фигурные
            enemy.isAttacking=false // чтобы удар был произведен 1 раз
            player.health-=20
            document.querySelector('#playerHealth').style.width=player.health+'%'
            console.log('go enemy')
        }
    if(enemy.health===0 || player.health===0)  
    {
        determineWinner(timerId)
    }  
}

const keys = { // тут равно
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }
}

animate()
window.addEventListener('keydown', (event)=>{ // нажатие кнопки 
    switch (event.key){
        // keys for player
        case 'd':
            keys.d.pressed=true // двигаем по коррдинате x
            player.lastKey='d'
            break
        case 'a':
            keys.a.pressed=true
            player.lastKey='a'
            break
        case 'w':
            player.velocity.y=-20
            break
        // spacebar for attack
        case ' ':
            player.attack()
            break
        // keys for enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed=true
            enemy.lastKey='ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true
            enemy.lastKey='ArrowLeft'
            break
        case 'ArrowDown':
            enemy.attack()
            break
        case 'ArrowUp':
            enemy.velocity.y=-20
            break
    }
    // console.log(event.key) // все это стрелочная функция, выводит в консоль нажатую клавишу
})
// может произойти такая ситуация что зажаты обе кнопки см. const keys!!!!!!!!!
window.addEventListener('keyup', (event)=>{ // когда отпутили кнопку персонаж останавливается
    switch(event.key){
        // player keys
        case 'd':
            keys.d.pressed=false
            break
        case 'a':
            keys.a.pressed=false
            break
        case 'w':
            keys.w.pressed=false
            break
        // enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed=false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed=false
            break
    }
})
