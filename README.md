# interval-handler
A super tiny library to manage timers and intervals in a sequence

# API Reference
## Classes

<dl>
<dt><a href="#IntervalHandler">IntervalHandler</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#timer">timer</a> : <code>object</code></dt>
<dd><p>Timer object desc..</p>
</dd>
<dt><a href="#options">options</a> : <code>object</code></dt>
<dd><p>Handlers option object desc..</p>
</dd>
</dl>

<a name="IntervalHandler"></a>

## IntervalHandler
**Kind**: global class  

* [IntervalHandler](#IntervalHandler)
    * [new IntervalHandler(options)](#new_IntervalHandler_new)
    * [.interval](#IntervalHandler+interval) : <code>number</code>
    * [.immediateCall](#IntervalHandler+immediateCall) : <code>boolean</code>
    * [.add(section)](#IntervalHandler+add) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.start()](#IntervalHandler+start) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.next()](#IntervalHandler+next) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.again()](#IntervalHandler+again) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.tryAgain()](#IntervalHandler+tryAgain) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.event()](#IntervalHandler+event) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.done()](#IntervalHandler+done) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
    * [.stopAll()](#IntervalHandler+stopAll) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)

<a name="new_IntervalHandler_new"></a>

### new IntervalHandler(options)
Handles a sequence of sections, consisting of functions.

**Returns**: <code>object</code> - Handler object  

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>options</code>](#options) | Additional options |

<a name="IntervalHandler+interval"></a>

### intervalHandler.interval : <code>number</code>
Default interval duration of all functions.

**Kind**: instance property of [<code>IntervalHandler</code>](#IntervalHandler)  
**Default**: <code>2000</code>  
<a name="IntervalHandler+immediateCall"></a>

### intervalHandler.immediateCall : <code>boolean</code>
If this option is true, functions will be called immediatly by default.Otherwise, after a section starts, function will be executed after the timer duration.

**Kind**: instance property of [<code>IntervalHandler</code>](#IntervalHandler)  
**Default**: <code>true</code>  
<a name="IntervalHandler+add"></a>

### intervalHandler.add(section) ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
Adds a section of timer objects

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  
**Returns**: [<code>IntervalHandler</code>](#IntervalHandler) - Handler object  

| Param | Type | Description |
| --- | --- | --- |
| section | [<code>Array.&lt;timer&gt;</code>](#timer) | Array of timer objects |

<a name="IntervalHandler+start"></a>

### intervalHandler.start() ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
Starts the sequence of sections from the beginning.

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  
**Returns**: [<code>IntervalHandler</code>](#IntervalHandler) - Handler object  
<a name="IntervalHandler+next"></a>

### intervalHandler.next() ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
todo...

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  
**Returns**: [<code>IntervalHandler</code>](#IntervalHandler) - Handler object  
<a name="IntervalHandler+again"></a>

### intervalHandler.again() ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
todo...

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  
**Returns**: [<code>IntervalHandler</code>](#IntervalHandler) - Handler object  
<a name="IntervalHandler+tryAgain"></a>

### intervalHandler.tryAgain() ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
todo...

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  
**Returns**: [<code>IntervalHandler</code>](#IntervalHandler) - Handler object  
<a name="IntervalHandler+event"></a>

### intervalHandler.event() ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
todo...

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  
**Returns**: [<code>IntervalHandler</code>](#IntervalHandler) - Handler object  
<a name="IntervalHandler+done"></a>

### intervalHandler.done() ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
todo...

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  
**Returns**: [<code>IntervalHandler</code>](#IntervalHandler) - Handler object  
<a name="IntervalHandler+stopAll"></a>

### intervalHandler.stopAll() ⇒ [<code>IntervalHandler</code>](#IntervalHandler)
todo...

**Kind**: instance method of [<code>IntervalHandler</code>](#IntervalHandler)  
**Returns**: [<code>IntervalHandler</code>](#IntervalHandler) - Handler object  
<a name="timer"></a>

## timer : <code>object</code>
Timer object desc..

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| fnc | <code>function</code> | Funcion |
| [interval] | <code>number</code> | Interval |
| [immediateCall] | <code>boolean</code> | Option to execute timers function immediately. |

<a name="options"></a>

## options : <code>object</code>
Handlers option object desc..

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [interval] | <code>number</code> | Interval |
| [immediateCall] | <code>boolean</code> | Option to execute timers function immediately. |

