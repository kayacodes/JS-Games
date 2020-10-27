document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
  
    const width = 10
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0 //so first div in our grid
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
    
    //To start or restart the game
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //function that deals with ALL the outcomes of the snake
    function moveOutcomes() {
        //deals with snake hitting border and sake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if the snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if the snake hits the right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) ||//if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake collides with itself
        ) {
            return clearInterval(interval) //clears interval if any of the above happen
        }

        const tail = currentSnake.pop() //removes last item of the array and shows it
        squares[tail].classList.remove('snake') //removes class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

        //deals with snake getting apple
        if (squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake')) //make sure apples dont appear on any div that already has snake
        squares[appleIndex].classList.add('apple')
    }

    //assign functions to keycodes
    function control(e){

        if (e.keyCode === 39) {
            direction = 1 //snake goes right if right arrow key is pressed
        } else if (e.keyCode === 38) {
            direction = -width //if we press the up arrow the snake will go back 10 divs, appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1 //if we press the left arrow the snake will go left
        } else if (e.keyCode === 40) {
            direction = +width //if we press the down arrow the snake will go down 10 divs
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})
