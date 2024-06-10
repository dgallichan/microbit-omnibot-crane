input.onButtonPressed(Button.A, function () {
    thisSpeed = 30
    thisPause = 2000
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Reverse, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor3, Kitronik_Robotics_Board.MotorDirection.Forward, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor4, Kitronik_Robotics_Board.MotorDirection.Reverse, thisSpeed)
    basic.pause(thisPause)
    Kitronik_Robotics_Board.allOff()
    basic.pause(thisPause)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Reverse, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor3, Kitronik_Robotics_Board.MotorDirection.Reverse, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor4, Kitronik_Robotics_Board.MotorDirection.Forward, thisSpeed)
    basic.pause(thisPause)
    Kitronik_Robotics_Board.allOff()
})
input.onButtonPressed(Button.AB, function () {
    basic.showLeds(`
        # # # # #
        # . . . #
        # . # . #
        # . . . #
        # # # # #
        `)
    currentSmooth = smoothFactor
    smoothFactor = 0.9
    servoBase_target = 90
    servoLeft_target = 90
    servoRight_target = 90
    servoGrip_target = 135
    basic.pause(2000)
    smoothFactor = currentSmooth
    isCraneIdle = !(isCraneIdle)
    if (isCraneIdle) {
        basic.showIcon(IconNames.Ghost)
    } else {
        basic.showIcon(IconNames.Butterfly)
    }
})
input.onButtonPressed(Button.B, function () {
    thisSpeed = 40
    thisPause = 2000
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Reverse, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Reverse, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor3, Kitronik_Robotics_Board.MotorDirection.Reverse, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor4, Kitronik_Robotics_Board.MotorDirection.Reverse, thisSpeed)
    basic.pause(thisPause)
    Kitronik_Robotics_Board.allOff()
    basic.pause(thisPause)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor3, Kitronik_Robotics_Board.MotorDirection.Forward, thisSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor4, Kitronik_Robotics_Board.MotorDirection.Forward, thisSpeed)
    basic.pause(thisPause)
    Kitronik_Robotics_Board.allOff()
})
radio.onReceivedValue(function (name, value) {
    serial.writeValue("a." + name, value)
    if (randint(0, 10) < 1) {
        led.toggle(0, 0)
    }
    thisValue = Math.constrain(value, -100, 100)
    if (name == "M1") {
        if (thisValue > 0) {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, thisValue)
        } else {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Reverse, -1 * thisValue)
        }
    } else if (name == "M2") {
        if (thisValue > 0) {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Reverse, thisValue)
        } else {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, -1 * thisValue)
        }
    } else if (name == "M3") {
        if (thisValue > 0) {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor3, Kitronik_Robotics_Board.MotorDirection.Reverse, thisValue)
        } else {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor3, Kitronik_Robotics_Board.MotorDirection.Forward, -1 * thisValue)
        }
    } else if (name == "M4") {
        if (thisValue > 0) {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor4, Kitronik_Robotics_Board.MotorDirection.Forward, thisValue)
        } else {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor4, Kitronik_Robotics_Board.MotorDirection.Reverse, -1 * thisValue)
        }
    } else if (!(isCraneIdle)) {
        if (name == "CB") {
            speedBase = Math.map(thisValue, -100, 100, -2, 2)
        } else if (name == "CR") {
            speedLeft = Math.map(thisValue, -100, 100, -2, 2)
        } else if (name == "CL") {
            speedRight = Math.map(thisValue, -100, 100, -2, 2)
        } else if (name == "CG") {
            speedGrip = Math.map(thisValue, -100, 100, -2, 2)
        }
    }
})
let thisValue = 0
let currentSmooth = 0
let thisPause = 0
let thisSpeed = 0
let smoothFactor = 0
let servoGrip_target = 0
let servoRight_target = 0
let servoLeft_target = 0
let servoBase_target = 0
let isCraneIdle = false
let speedBase = 0
let speedLeft = 0
let speedRight = 0
let speedGrip = 0
basic.showIcon(IconNames.Butterfly)
radio.setGroup(220)
Kitronik_Robotics_Board.allOff()
speedGrip = 0
speedRight = 0
speedLeft = 0
speedBase = 0
isCraneIdle = false
servoBase_target = 90
servoLeft_target = 90
servoRight_target = 90
servoGrip_target = 135
let servoBase = 90
let servoLeft = 90
let servoRight = 90
let servoGrip = 135
smoothFactor = 0.5
basic.forever(function () {
    if (Math.abs(speedBase) < 5 && Math.abs(speedGrip) < 5 && Math.abs(speedLeft) < 5 && Math.abs(speedRight) < 0) {
        isCraneIdle = true
    } else {
        isCraneIdle = false
    }
})
basic.forever(function () {
    if (!(isCraneIdle)) {
        servoBase_target = Math.constrain(servoBase_target, 45, 135)
        servoLeft_target = Math.constrain(servoLeft_target, 35, 155)
        servoRight_target = Math.constrain(servoRight_target, 45, 160)
        servoGrip_target = Math.constrain(servoGrip_target, 90, 180)
        servoBase = smoothFactor * servoBase + (1 - smoothFactor) * servoBase_target
        servoLeft = smoothFactor * servoLeft + (1 - smoothFactor) * servoLeft_target
        servoRight = smoothFactor * servoRight + (1 - smoothFactor) * servoRight_target
        servoGrip = smoothFactor * servoGrip + (1 - smoothFactor) * servoGrip_target
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo6, servoBase)
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo7, servoLeft)
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo8, servoRight)
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, servoGrip)
        servoBase_target = servoBase_target - speedBase
        servoLeft_target = servoLeft_target + speedLeft
        servoRight_target = servoRight_target + speedRight
        servoGrip_target = servoGrip_target + speedGrip
    }
})
