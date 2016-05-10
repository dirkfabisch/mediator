---
layout: post
title:  "KVC and Collection Operators"
date: 2016-05-09 18:45:00
tags: featured
image: /assets/article_images/kvc-collection-operators/post.jpg
image2: /assets/images/homepage.jpg
---

# KVC and Collection Operators

KVC, known as Key-Value Coding, is a coding style where properties and methods of an object are accessible via string identifiers. For much comprehensive detail and definition for key-value coding, read [the apple docs.][kvc_apple_docs]

In NSFoundation framework, any NSObject subclass automatically conforms [`NSKeyValueCoding`][nskvc_apple_docs] protocol.
To derive a better understanding of kvc,I personally prefer to dive in code examples.

## Simple KVC

KVC basis includes two essential methods `valueForKey:` and `setValue:ForKey:` 

```objective_c
Person *person = [Person new];
person.name = @"John Smith";
[person valueForKey:@"name"]; // John Smith

[person setValue:@20 forKey:@"age"];
[person valueForKey:@"age"]; // 20

```    
The above example works just because the class `Person` has **accessor methods/properties** named `name` and `age`. If we were asking for the value of key `fullname` which is not defined in `Person` interface, we would get this error.

```objective_c
[person valueForKey:@"fullname"];
//'NSUnknownKeyException', reason: '[<Person 0x7ffdd9d183e0> valueForUndefinedKey:]: 
//this class is not key value coding-compliant for the key fullname.

```
Another method `valueForKeyPath:` allows to access **nested properties** on the receiver object:

```objective_c
[object valueForKey:@"property.anotherProperty.yetAnother"];
```
Showing in our person example:

```objective_c
Person *child = [Person new];
child.name = @"Jane Doe";
person.child = child;

[person valueForKeyPath:@"child.name.uppercaseString"]; // JANE DOE

```
Notice that key-value coding includes not only **properties** but also **no-parameter methods**. `uppercaseString` is not a property of `NSString` but also accessible via **KVC**.

**KVC** methods on **collections** results a new array which consists of objects pointed with the `keyPath`.
If we had an *employees* array for instance, we could call 

```objective_c
[employees valueForKeyPath:@"phone.model"]; // [@"Apple",@"Samsung", @"HTC",@"Blackberry"]
```
and get another array including the object specified in the path.

## Collection Operators

According to the [documentation][co_apple_docs];

> *Collection operators allow actions to be performed on the items of a collection using key path notation and an action operator.*

Predefined collection operators are:

* @avg
* @count
* @max
* @min
* @sum

And notation for collection operators are shown in the docs:

![Notation]({{ site.url }}/assets/article_images/kvc-collection-operators/note.jpg) 

Let's express them with some examples, consider a our person object:

```objective_c
@interface Person : NSObject

@property (nonatomic,strong) NSString *name;
@property (nonatomic,strong) NSNumber *age;
@property (nonatomic) int height;
@property (nonatomic,strong) Person   *child;

@end
```

and a random people array:

 Name | Age | Height
---| ---- | ---- 
John | 30 | 180 cm
Kelly | 15 | 176 cm
Simon | 24 | 196 cm
Chris | 3 | 100 cm


```objective_c
Person *john = ...
Person *kelly = ...
Person *simon = ...
Person *chris = ...

NSArray *people = [john,kelly,simon,chris];

[people valueForKeyPath:@"@avg.age"]; // 18
[people valueForKeyPath:@"@avg.height"]; // 163
   
[people valueForKeyPath:@"@max.age"]; // 30
[people valueForKeyPath:@"@min.height"]; // 100
   
[people valueForKeyPath:@"@sum.age"]; // 72
[people valueForKeyPath:@"@sum.height"]; // 652

..
..

```

The first line with a **collection operator** is `[people valueForKeyPath:@"@avg.age"]`. Here the path `@avg.age` is a **virtual path**, calculating the **average** value of the property `age`. 

Here is the secret behind the scenes:

* `@avg` virtual path first calls `[people valueForKeyPath:@"age"]` 
* That call results in a new collection of NSNumbers, `[@30,@15,@24,@3]` in our example
* After that, generates the average value of that array.

Similarly we can average the `height` out by calling the key path `@avg.height`. 

`@max`, `@min` and `@sum` is self-explanatory, they are all used to make calculations a property of and item in the whole collection. `@min` for instance, we could also write the same expression as follows:

```objective_c
NSNumber *max = @0;    
for (Person *person in people) {
    if (person.age.integerValue > max.integerValue) {
        max = person.age;
    }
}
// max = 30
```

Collection operators are not only reducing our code, also adds more readability to it.


## Object Operators

Like the **collection operators**, **object operators** applied to a single collection instance. 

* @distinctUnionOfObjects
* @unionOfObjects

`@distinctUnionOfObjects` eliminates the duplicated items according to the specified key path. Let's assume we have an array with duplicated items:

```objective_c
NSArray *items = @[@"iPhone 6s",@"Samsung",@"Samsung Edge",@"iphone",@"iPhone 6s",@"Samsung"];

[items valueForKeyPath:@"@distinctUnionOfObjects.self"]; // iPhone 6s,@"Samsung",@"Samsung Edge",@"iphone"

```
Notice that `self` after the operators cause the operators run on the **object itself**.

> Explained in the [docs][kvc_apple_docs], the leaf object (here is _self_ ) can not be nil for `@distinctUnionOfObjects` operator. 


`@unionOfObjects` basically does the same as we call 

```objective_c
[items valueForKeyPath:@"self"]; 

```

therefor duplicated are not removed, and no special behavior also.

#### Array and Set Operators

There is also another bunch of operators, `@distinctUnionOfArrays, @unionOfArrays, @distinctUnionOfSets`, which operates on arrays or arrays. Sample code using the people array above, explains better:

```objective_c
NSArray *workers = @[john,kelly,simon,chris];
NSArray *friends = @[john,alice,chris];
    
[@[workers,friends] valueForKeyPath:@"@distinctUnionOfArrays.name"]; 
// [@"John",@"Kelly",@"Simon",@"Chris",@"Alice"]

[@[workers,friends] valueForKeyPath:@"@unionOfArrays.name"]; 
// [@"John",@"Kelly",@"Simon",@"Chris",@"John",@"Alice",@"Chris"]

```

`@distinctUnionOfSets` operates exactly the same as `@distinctUnionOfObjects`, except they are used on `NSSet` instances.


## Bonus: Custom Operators

Despite there is no documentation from apple on **customizing operators**, [Nicolas Bachschmidt][nicolas] showed a way to implements custom operators.

Let's create a `@multiply` operator, which **multiplies** every item specified with the **keypath**, returns the result.

In order to create a **custom operator**, we must know what the operators do behind the scene.

For instance `@avg` operator, calls `_avgForKeyPath:` on its receiver. Same for `@min`, it calls `_minForkeyPath:` on its receiver which is an NSArray instance.

Therefore if we would have a method called `_multiplyForKeyPath:`, then we can use `@multiply` operator for an array of `NSNumber` instances.

```objective_c

@interface NSArray (Multiply)

- (NSNumber *) _multiplyForKeyPath:(NSString *)keyPath;

@end

@implementation NSArray (Multiply)

-(NSNumber *)_multiplyForKeyPath:(NSString *)keyPath
{
    NSArray *values = [self valueForKeyPath:keyPath];
    float result = 1.0f;
    for (NSNumber *number in values) {
        result = result * number.floatValue;
    }
    return @(result);
}

```

Finally, the usage of our new `@multiply` operator:

```objective_c
[@[@3,@2.2,@1] valueForKeyPath:@"@multiply.self"] // 6.6

```

You can extract as many operators as you want, depends on your imagination. An example of an advanced operator is 

```objective_c
[people valueForKeyPath: @"[distinct].{age<10}.name"];

```
which is impossible with the current implementation, but kicks and idea what custom operators look like in the future. 

Honestly I doubt this code is totally safe for **AppStore App validation**, but for the next version in iOS, hopefully we will find much broad implementation on operators. 

[kvc_apple_docs]:https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/KeyValueCoding/Articles/Overview.html#//apple_ref/doc/uid/20001838-SW1
[nskvc_apple_docs]:https://developer.apple.com/library/mac/documentation/Cocoa/Reference/Foundation/Protocols/NSKeyValueCoding_Protocol/
[co_apple_docs]:https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/KeyValueCoding/Articles/CollectionOperators.html
[nicolas]:https://twitter.com/baarde