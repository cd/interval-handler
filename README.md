# interval-handler

A super tiny library to manage timers in JavaScript

## Demo

🔥 https://codepen.io/chrdiede/pen/eYYjpwX 🔥

## Getting started

### CDN Import

```html
<script src="https://cdn.jsdelivr.net/gh/cd/interval-handler/interval-handler.min.js"></script>
```

### Quick Start

First, you have to create an instance:

```javascript
// Create instance
var myTimers = new IntervalHandler();
```

Now add timers to the instance:

```javascript
// First argument: Reference of the function
// Second argument (optional): Interval in milliseconds
// Further arguments will be passed as function arguments
myTimers.setTimer(console.log, 2000, "Hello from console");
```

If there is no valid second argument, the default interval applies. You can set the default interval like this:

```javascript
IntervalHandler.interval = 3000; // milliseconds
```

Timers can be easily overwritten:

```javascript
// Function will only be executed in 2 seconds
myTimers.setTimer(myFnc, 1000);
myTimers.setTimer(myFnc, 2000);
```

Clear timer like this:

```javascript
// Clear a specific timer
myTimers.clearTimer(myFnc);

// Clear all timers
myTimers.clearTimer();
```
