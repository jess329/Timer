class Timer{
    constructor(timeInput, startButton, pauseButton, callbacks){
        this.timeInput = timeInput
        this.startButton = startButton
        this.pauseButton = pauseButton
        if(callbacks) {
            this.onStart = callbacks.onStart
            this.onTick = callbacks.onTick
            this.onComplete = callbacks.onComplete
        }
        
        this.startButton.addEventListener("click", this.start)
        this.pauseButton.addEventListener("click", this.pause)
    }
    
    start = () => {
        this.starterTime = this.timeInput.value
        this.timeLeft = this.timeInput.value
        this.onStart()
        this.tick()
        this.interval = setInterval(this.tick, 50)
    }
    tick = () => {
        if(this.timeLeft > 0){
            this.timeLeft -= 0.05
            this.onTick(this.starterTime, this.timeLeft)
            this.timeInput.value = this.timeLeft.toFixed(2)
        } else{
            this.onComplete()
            this.pause()
        }
    }
    pause = () => {
        clearInterval(this.interval)
    }
}
const timeInput = document.getElementById("input")
const startButton = document.getElementById("start")
const pauseButton = document.getElementById("pause")
const circle = document.getElementById("border")

const circleRadius = circle.getAttribute("r")
const perimeter = 2 * circleRadius * Math.PI
circle.setAttribute("stroke-dasharray", perimeter)

timer = new Timer(timeInput, startButton, pauseButton, {
    onStart() {
        console.log("Timer started");
    },
    onTick(starterTime, timeLeft) {
        let timePassed = starterTime - timeLeft
        // console.log("Tick", starterTime, timeLeft, timePassed);
        let offsetValue = (perimeter / starterTime) * timePassed
        circle.setAttribute("stroke-dashoffset", -offsetValue)
    },
    onComplete() {
        console.log("Timer complete");
    }
})


