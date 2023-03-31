## Questionaire

There was a few question in the task description too. I will try to answer them here.

#### 1. What is, to your knowledge, the main differences between a relational database and a NoSQL database, and when would you prefer the latter.

Relational database handle transactions and relations while NoSQL (mostly) don't. These additional things adds overhead to relational databaseses, but at the same time, make them more reliable and safe. These additional overhead will slow down them a little bit in compared with NoSQL databases, and make turning them into distributed databases a lot more complex and difficult if not impossible.

Therefore, if you are working in a really complicated domain with a lot of relations, while reliability and being sure about data is a priority, you should probably use relation dbs as your main source of data storage. But, if you have a lot of incoming data, speed is really important for you, your data is somewhat simple with no to little relations, or they can change really quickly and you need a little bit flexibility, NoSQL can be better for you.

Also, different NoSQL dbs have different use cases. For example, if you want to do full text search, Elsatic is always your go-to choice. Or if you have graph data, there are NoSQL dbs optimized for that.


#### 2. Explain the difference between the keywords Implements and Extends when designing classes
`Implements` is used for interfaces and indicates that this object is going to implement this interface.

`Extends` is used when you want to create a child or subclass of another subclass. The extended class will have all the functionality of the parent class but can add or change some.


#### 3. Name some reasons why javascript applications use asynchronous code (Promises)
javascript is single-thread, while it means there will be no parallelism in it, it has a really good support for concurrency which means different task can be run all together. and this concurrency is exceptionally helpful when you are working with IO a lot and are waiting for some processess to be done, then you can run other tasks asynchronously.

For example, when you are reading a file, while your application is waiting for the harddisk to read bytes and send them to you, you can put your unused resources on another task and get back to this one when that reading is finished.

I'm not sure if it asnwers the question though :)

#### 4. What is the difference between === and == when comparing two variables?
`===` compares values exactly. `==` compares them loosely. for example:
```
'2' == 2 // true
'2' === 2 // false
'' == 0 // true
undefined == null //true
undefined === null // false
```
(to be honest, javascript is really crazy with `==` and it is imo weirdly unpredictable and should be avoided most of the time, I actually run code and checked this examples to be honest.)

#### 5. What are the differences between the javascript keywords const, var and let?
`const` is immutable, and can only be used in the enclosed block.
`let` is not immutable,  and can only be used in the enclosed block.
`var` is not immutable, but can be used in the function (even if it is defined in a `for` or `if` block). also `var` outside of a function will be a global variable.

#### 6. Write a simple function that takes an array of strings, and returns an array of numbers representing the length of those strings, ex: [“a”,”foo”,”b”,”foobar”] returns [1,3,1,6]

```javascript
function stringLengths(input) {
    return input.map(s => s.length)
}
```

#### 7. When we import the following file, why is it only printing the “Hello World” text and not the others?
Because the second function is an annonymize function that has been called at the time of definition (with `()`) at the end.

#### 8. Which one/ones of 1, 2 och 3 is the correct way to use the promise defined in the top of this file?

Code 2 is the correct one. `value` is a promise that will resolve a string.
