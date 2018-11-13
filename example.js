const myIntervals = require('./interval-handler')()

let counter = 0

myIntervals
  // 1. API-Login
  .add([{ fnc: login }])

  // 2. Get once-only init data from two api functions.
  .add([{ fnc: getInitData1 }, { fnc: getInitData2 }])

  // 3. Get regular api data cyclically
  .add([{ fnc: getData1 }, { fnc: getData2, interval: 3000 }])

  // 4. Initialized after receiving regular api data first time
  .event([ initialized ])

  // 5. Eventually API logout
  .add([{ fnc: logout }])

  // Start my interval plan
  .start()

function login (timer) {
  console.log('Logged in!')
  myIntervals.done(timer)
}

function getInitData1 (timer) {
  counter++
  try {
    if (counter === 1) throw new Error('Get init data from fnc1... FAILED!')
    console.log('Get init data from fnc1... OK!')
    myIntervals.done(timer)
  } catch (e) {
    console.log(e.message)
    myIntervals.tryAgain(timer) // try again in a few seconds...
  }
}

function getInitData2 (timer) {
  console.log('Get init data from fnc2... OK!')
  myIntervals.done(timer)
}

function getData1 (timer) {
  console.log('Get data from fnc1... OK!')
  counter++
  if (counter < 7) {
    myIntervals.again(timer)
  } else {
    myIntervals.next(timer)
  }
}

function getData2 (timer) {
  console.log('Get data from fnc2... OK!')
  myIntervals.again(timer)
}

function initialized (timer) {
  console.log('Initialized!')
}

function logout (timer) {
  console.log('Logged out!')
  myIntervals.done(timer)
}
