/**
 * Handles a sequence of sections consisting of functions.
 * @constructor
 * @param {options} [options] Additional options. Defines the default behavior. Custom properties are allowed.
 * @param {number} [options.interval] Default timer interval.
 * @param {number} [options.immediateCall] Default option to call functions immediately when a section starts.
 * @return {IntervalHandler}
 */
function IntervalHandler (options) {
  let handler = Object.create(IntervalHandler.prototype)
  if (options) Object.assign(handler, options)
  handler._sections = []
  handler._currentSectionIndex = 0
  handler._events = []
  return handler
}

IntervalHandler.prototype = {
  /**
   * Default timer interval.
   * @type {number}
   * @default
   */
  interval: 2000,

  /**
   * Default option to call functions immediately when a section starts.
   * @type {boolean}
   * @default
   */
  immediateCall: true,

  /**
   * Calls a function.
   * @param {object} timer
   * @private
   */
  _fire (timer) {
    timer.startingTime = Date.now()
    timer.fnc(timer, ...timer.fncArgs)
  },

  /**
   * All functions with the 'immediateCall' option will be called directly.
   * Otherwise the timers to call the functions will be started.
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
   * Activates the next section.
   * @return {boolean} Result of the operation.
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
   * Sets a flag to a timer when its function completes.
   * If all functions are finished at the first time, the attached event functions will be called.
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
   * Adds a section of functions to a sequence.
   * @param {Object[]} section
   * @param {function} section[].fnc Function to call.
   * @param {array} section[].args Functions arguments
   * @param {number} [section[].interval] Interval rate to call the timer's function.
   * @param {number} [section[].immediateCall] Option to call the function immediately when a section starts.
   * @return {IntervalHandler}
   */
  add (section) {
    const timers = []
    section.forEach(timer => {
      timers.push({
        fnc: timer.fnc,
        fncArgs: timer.args || [],
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
   * @return {IntervalHandler}
   */
  start () {
    this._currentSectionIndex = 0
    this._startSection()
    return this
  },

  /**
   * Stops all timers and starts the next section.
   * If there is no next section, nothing happens anymore.
   * @return {IntervalHandler}
   */
  next () {
    this._stopSection()
    if (this._increaseSectionIndex()) this._startSection()
    return this
  },

  /**
   * Starts the function's timer again.
   * @param {timer} [timer]
   * @param {number} [interval] Option to change the interval duration just for the next run.
   * @return {IntervalHandler}
   */
  again (timer, interval) {
    if (!timer) return this
    this._timerReached(timer)
    this.tryAgain(timer, interval)
    return this
  },

  /**
   * Starts the function's timer again without setting the internal 'reached' flag for events.
   * @param {timer} [timer]
   * @param {number} [interval] Interval duration only for the next run.
   * @return {IntervalHandler}
   */
  tryAgain (timer, interval) {
    if (!timer) return this
    timer.done = false
    timer.timerId = setTimeout(this._fire, interval || timer.interval, timer)
    return this
  },

  /**
   * Attaches functions to a section as an event.
   * When all functions in the current section finished at least once,
   * all functions in the event will be called.
   * An event have to be placed after the corresponding section.
   * @param {Array.<function>} fncArr
   * @return {IntervalHandler}
   */
  event (fncArr) {
    if (this._sections.length > 0) {
      fncArr.forEach(fnc => {
        this._events.push({
          fnc,
          sectionIndex: this._sections.length - 1
        })
      })
    }
    return this
  },

  /**
   * Tags the function as finished and does not start the timer again.
   * @param {timer} timer
   * @return {IntervalHandler}
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
   * Stops all function's timers.
   * @return {IntervalHandler}
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
