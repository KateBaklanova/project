
class Sprite{
    // a constructor gets called when an object is created using the new keyword.
    constructor({position, imageSrc, scale = 1, frames=1}){ //чтобы было удобней передаем в функцию объект с полями position, velocity, а не отдельные значения 
        this.position = position // при этом не нужно соблюдать порядок передачи объектов тк указывается position:..., velocity
        this.width = 50
        this.height = 150
        this.image=new Image()
        this.scale=scale
        this.frames=frames // указывает на количество кадров анимации, по умолчанию 1
        this.framesCurrent=0 // текущий кадр, по умолчанию равен 0, чтобы фон не улетел
        this.framesElapsed=0
        this.framesHold=17
        // когда current достигнет frames цикл анимации обнуляется и повторяется см. update
        this.image.src=imageSrc
    }
    draw(){
        c.drawImage(
            this.image,
            // задаем фрагмент анимации
            this.framesCurrent*(this.image.width / this.frames), // от какого пикселя картинки начинаем вырезать кадры для анимации
            0,
            this.image.width/this.frames, // ширина кадра анимации
            this.image.height,
            // конец фйрагментации
            this.position.x,
            this.position.y,
            (this.image.width/this.frames)*this.scale, // конкретный размер изображения (подгоняем под кадр)
            this.image.height*this.scale)
    }
    
    update(){ // an update for position
        this.draw()
        this.framesElapsed++

        if(this.framesElapsed%this.framesHold===0)
        {
        if(this.framesCurrent<this.frames-1){
            this.framesCurrent++
        }
        else{
            this.framesCurrent=0
        }
    }
    }
}


class Fighter extends Sprite{
    // a constructor gets called when an object is created using the new keyword.
    constructor({position, velocity, color, offset, imageSrc, frames=1, scale=1, health}){ //чтобы было удобней передаем в функцию объект с полями position, velocity, а не отдельные значения 
        super({position, imageSrc, scale, frames}) // при этом не нужно соблюдать порядок передачи объектов тк указывается position:..., velocity
        this.velocity = velocity
        this.lastKey
        this.color=color
        this.attackBox = {
            position: {
                x: this.position.x, // позиция бокса не привязана к самому спрайту, так как один из них будет развернут
                y: this.position.y // это позиция по умолчанию
            },
            width: 100,
            height: 50,
        }
        this.offset=offset
        this.isAttacking = false

        this.framesCurrent=0 // текущий кадр, по умолчанию равен 0, чтобы фон не улетел
        this.framesElapsed=0
        this.framesHold=17

        this.health=100;
        this.width = 50
        this.height = 150
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height) // тут pixels
        
        if (this.isAttacking){
        c.fillStyle = 'red'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }
    
    update(){ // an update for position
        this.draw()

        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y

        this.attackBox.position.y=this.position.y-this.offset.y
        this.attackBox.position.x=this.position.x-this.offset.x

        if (this.position.y + this.height +this.velocity.y >= canvas.height-142){
            // canvas пиксели считаются сверху вниз (вверху 0, внизу наибольшее число)
            // поэтому чтобы прямоугольник не уполз за нижнюю грань холста нужно проверить это условие
            this.velocity.y = 0 // если условие выполнено, то обнуляем скорость объекта по y, он останавливается
        } else this.velocity.y += gravity // если не выполнено, то гравитация обеспечивает движение, пока не выполнится
    }

    attack(){
        this.isAttacking=true
        setTimeout(() => { // after 10 ms the attack stops
            this.isAttacking = false
        }, 500)
    }
}