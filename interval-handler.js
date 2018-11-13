/**
 * Timer object desc..
 * @typedef {object} timer
 * @property {function} fnc Funcion
 * @property {number} [interval] Interval
 * @property {boolean} [immediateCall] Option to execute timers function immediately.
 */

/**
 * Handlers option object desc..
 * @typedef {object} options
 * @property {number} [interval] Interval
 * @property {boolean} [immediateCall] Option to execute timers function immediately.
 */

/**
 * Handles a sequence of sections, consisting of functions.
 * @constructor
 * @param {options} options - Additional options
 * @return {object} Handler object
 */

function IntervalHandler (options) {
  let handler = Object.create(IntervalHandler.prototype)
  if (options) Object.assign(handler, options)
  handler._sections = []
  handler._currentSectionIndex = 0
  handler._events = []
  return handler
}

/**
 * Desc
 */
IntervalHandler.prototype = {

  /**
   * Default interval duration of all functions.
   * @type {number}
   * @default
   */
  interval: 2000,

  /**
   * If this option is true, functions will be called immediatly by default.
   * Otherwise, after a section starts, function will be executed after the timer duration.
   * @type {boolean}
   * @default
   */
  immediateCall: true,

  /**
   * Executes a function.
   * @param {object} timer
   * @private
   */
  _fire (timer) {
    timer.startingTime = Date.now()
    timer.fnc(timer)
  },

  /**
   * Starts all functions and timers in a section.
   * @private
   */
  _startSection () {
    this._sections[this._currentSectionIndex].forEach(timer => {
      timer.done = false
      timer.reached = false
      if (timer.immediateCall) {
        this._fire(timer)
      } else {
        timer.timerId = setTimeout(this._fire, timer.interval, timer)
      }
    })
  },

  /**
   * Stops all timers in the current section.
   * @private
   */
  _stopSection () {
    this._sections[this._currentSectionIndex].forEach(timer => {
      clearTimeout(timer.timerId)
    })
  },

  /**
   * Selects next section.
   * @private
   */
  _increaseSectionIndex () {
    if ((this._currentSectionIndex + 1) < this._sections.length) {
      this._currentSectionIndex++
      return true
    }
    return false
  },

  /**
   * Sets a flag to a timer when its function completed.
   * If all timer functions completed, it will executes event functions once-only.
   * @param {object} timer
   * @private
   */
  _timerReached (timer) {
    if (!timer.reached) {
      timer.reached = true
      const event = this._events.find(e => e.sectionIndex === this._currentSectionIndex)
      if (event) {
        if (!this._sections[this._currentSectionIndex].find(e => { return e.reached === false })) {
          event.fnc()
        }
      }
    }
  },

  /**
   * Adds a section of timer objects
   * @param {timer[]} section Array of timer objects
   * @return {IntervalHandler} Handler object
   */
  add (section) {
    const timers = []
    section.forEach(timer => {
      timers.push({
        fnc: timer.fnc,
        interval: timer.interval || this.interval,
        immediateCall: timer.immediateCall || this.immediateCall,
        timerId: null,
        startingTime: null,
        done: false,
        reached: false
      })
    })
    this._sections.push(timers)
    return this
  },

  /**
   * Starts the sequence of sections from the beginning.
   * @return {IntervalHandler} Handler object
   */
  start () {
    // todo: beende alle timer die eventuell noch vor dem vorherigen durchlauf aktiv sind
    this._currentSectionIndex = 0
    this._startSection()
    return this
  },

  /**
   * todo...
   * @return {IntervalHandler} Handler object
   */
  next () {
    this._stopSection()
    if (this._increaseSectionIndex()) this._startSection()
    return this
  },

  /**
   * todo...
   * @return {IntervalHandler} Handler object
   */
  again (timer, interval) {
    if (!timer) return this
    this._timerReached(timer)
    this.tryAgain(timer, interval)
    return this
  },

  /**
   * todo...
   * @return {IntervalHandler} Handler object
   */
  tryAgain (timer, interval) {
    if (!timer) return this
    timer.done = false
    timer.timerId = setTimeout(this._fire, interval || timer.interval, timer)
    return this
  },

  /**
   * todo...
   * @return {IntervalHandler} Handler object
   */
  event (fncArr) {
    fncArr.forEach(fnc => {
      this._events.push({
        fnc,
        sectionIndex: this._sections.length - 1 // todo: was ist wenn event am anfang steht?
      })
    })
    return this
  },

  /**
   * todo...
   * @return {IntervalHandler} Handler object
   */
  done (timer) {
    if (!timer) return this
    this._timerReached(timer)
    timer.done = true
    if (!this._sections[this._currentSectionIndex].find(e => { return e.done === false })) {
      if (this._increaseSectionIndex()) this._startSection()
    }
    return this
  },

  /**
   * todo...
   * @return {IntervalHandler} Handler object
   */
  stopAll () {
    this._sections.forEach(section => {
      section.forEach(timer => {
        clearTimeout(timer.timerId)
        timer.done = true
      })
    })
    return this
  }
}

module.exports = IntervalHandler
