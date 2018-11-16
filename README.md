# interval-handler
A super tiny library to manage timers and intervals in a sequence

# API Reference
<a name="IntervalHandler"></a>

## IntervalHandler
**Kind**: global class  

* [IntervalHandler](#IntervalHandler)
    * [new IntervalHandler([options])](#new_IntervalHandler_new)
    * [.interval](#IntervalHandler+interval) : <code>number</code>
    * [.immediateCall](#IntervalHandler+immediateCall) : <code>boolean</code>
    * [.add(section)](#IntervalHandler+add) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.start()](#IntervalHandler+start) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.next()](#IntervalHandler+next) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.again([timer], [interval])](#IntervalHandler+again) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.tryAgain([timer], [interval])](#IntervalHandler+tryAgain) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.event(fncArr)](#IntervalHandler+event) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.done(timer)](#IntervalHandler+done) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.stopAll()](#IntervalHandler+stopAll) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)

<a name="new_IntervalHandler_new"></a>

### new IntervalHandler([options])
Handles a sequence of sections consisting of functions.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>options</code> | Additional options. Defines the default behavior. Custom properties are allowed. |
| [options.interval] | <code>number</code> | Default timer interval. |
| [options.immediateCall] | <code>number</code> | Default option to call functions immediately when a section starts. |

<a name="IntervalHandler+interval"></a>

### intervalHandler.interval : <code>number</code>
Default timer interval.

**Kind**: instance property of [<code>IntervalHandler</code>](#IntervalHandler)  
**Default**: <code>2000</code>  
<a name="IntervalHandler+immediateCall"></a>

### intervalHandler.immediateCall : <code>boolean</code>
Default option to call functions immediately when a section starts.

**Kind**: instance property of [<code>IntervalHandler</code>](#IntervalHandler)  
**Default**: <code>true</code>  
<a name="IntervalHandler+add"></a>

### intervalHandler.add(section) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
Adds a section of functions to a sequence.

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  

| Param | Type | Description |
| --- | --- | --- |
| section | <code>Array.&lt;Object&gt;</code> |  |
| section[].fnc | <code>function</code> | Function to call. |
| [section[].interval] | <code>number</code> | Interval rate to call the timer's function. |
| [section[].immediateCall] | <code>number</code> | Option to call the function immediately when a section starts. |

<a name="IntervalHandler+start"></a>

### intervalHandler.start() ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
Starts the sequence of sections from the beginning.

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  
<a name="IntervalHandler+next"></a>

### intervalHandler.next() ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
Stops all timers and starts the next section.If there is no next section, nothing happens anymore.

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  
<a name="IntervalHandler+again"></a>

### intervalHandler.again([timer], [interval]) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
Starts the function's timer again.

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  

| Param | Type | Description |
| --- | --- | --- |
| [timer] | <code>timer</code> |  |
| [interval] | <code>number</code> | Option to change the interval duration just for the next run. |

<a name="IntervalHandler+tryAgain"></a>

### intervalHandler.tryAgain([timer], [interval]) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
Starts the function's timer again without setting the internal 'reached' flag for events.

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  

| Param | Type | Description |
| --- | --- | --- |
| [timer] | <code>timer</code> |  |
| [interval] | <code>number</code> | Interval duration only for the next run. |

<a name="IntervalHandler+event"></a>

### intervalHandler.event(fncArr) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
Attaches functions to a section as an event.When all functions in the current section finished at least once,all functions in the event will be called.

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  

| Param | Type |
| --- | --- |
| fncArr | <code>Array.&lt;function()&gt;</code> | 

<a name="IntervalHandler+done"></a>

### intervalHandler.done(timer) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
Tags the function as finished and does not start the timer again.

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  

| Param | Type |
| --- | --- |
| timer | <code>timer</code> | 

<a name="IntervalHandler+stopAll"></a>

### intervalHandler.stopAll() ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
Stops all function's timers.

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  
