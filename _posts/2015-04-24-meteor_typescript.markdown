---
layout: post
title:  "Meteor&nbsp;+&nbsp;Typescript&nbsp;=&nbsp;<3"
author: marek
date:   2014-08-29 14:34:25
categories: jekyll update
tags:
image: /assets/article_images/2015-04-24-meteor_typescript/Cosmic_Fireball_Falling_Over_ALMA.jpg
---

It was a big news for the web development community when Google & Microsoft annouced that Angular 2 will be built with TypeScript. Lack of static typing in JavaScript often lets bugs get into the codebase unnoticed. This is especially true in the magical world of Meteor, where the ability to built awesome apps amazingly fast comes at a cost. TypeScript compiles to JS and lets you regain the safety of the static-typing.

We’ve been using TypeScript in development for more than a year now, and now that we become fans of Meteor, it was crucial for us to make it run on TypeScript. Although there are still some rough edges, it has worked brilliantly and already saved us a lot of time.

#It’s painful to build large Meteor projects with pure JavaScript
Dynamic typing in JavaScript surely streamlines writing the code, especially at the beginning, but it makes development much more costly as the project moves on. Function declarations bear no meaning about the types of the arguments and bad design is encouraged. It also limits the support the IDEs can give. In contrast, static typing turns the code into its own documentation and lets the IDEs support refactoring extensively, while acting as the first layer guarding against introduction of errors.

Meteor’s design makes it extremely easy to start building impressive applications with it.  However, this comes at a cost of things being magically matched between files by their names and injected in various places. This is especially true when you’re using the great Iron:Router package, which provides URL routes, controllers and layouts. It’s just too easy for changes to break things, since all the matching of methods names, session variable names, templates’ helpers, events and data is done by their string names and all related errors happen on runtime.

[ todo example bad Meteor with JS]

# What is TypeScript
> TypeScript is a free and open source programming language developed and maintained by Microsoft. It is a strict superset of JavaScript, and adds optional static typing and class-based object-oriented programming to the language. Anders Hejlsberg, lead architect of C# and creator of Delphi and Turbo Pascal, has worked on the development of TypeScript.

TypeScript is a language compiled to JavaScript with its compiler, `tsc`. Since it’s a superset of JS, every JS program becomes a TypeScript program once you change the file extension to `.ts`. TypeScript introduces static types, classes, modules and lambda functions, all compiled to readable code that could have been written by an experienced JavaScript developer. Essentially, it provides static types + a ton of features from upcoming ECMAScript standards (ES5, ES6, even ES7).

One of the crucial (typings)

#OK, so how do benefit from both Meteor and TypeScript?
Here’s how we dealt with those problems by using statically typed TypeScript. We did this in two steps.

The first step is to write as much as possible of the logic in well-structured and statically-typed object-oriented code, independent from Meteor. This is advisable anyway, but especially useful with static typing. What’s left for Meteor are mostly thin wrappers for templates, collections and methods, which are written in TypeScript as well, but with static typing turned off (by using the `any` type).

[ todo example nice Meteor with TS]

The second step is move the integration further and use a set of wrappers around core Meteor features, which add static typing to method calls, templates and route controllers. Although there is still much to be done, we’re open-sourcing this set of wrappers today.
How we can get Meteor + Typescript going?

Here’s how to set this up:
Configure project compilation


## Configuring project compilation
The recommended way to write Meteor apps in Typescript is to keep Typescript code independently and compile it into JavaScript files in Meteor project directory. Although there is the meteor-typescript-compiler package (https://github.com/meteor-typescript/meteor-typescript-compiler), it not yet ready to be used, since it cannot handle multiple interdependent Typescript files (if anything changes, please let us know!).

ręcznie (gulp)
pakiety (my mieliśmy problemy)
wykorzystanie tsconfig znacznie upraszcza (ale to jest nowy feature z TS1.5)

Advantages.
podpowiedzi do API meteora i pakietów (jquery)
prostszy refaktoring

# If that’s not enough.
nasze tricki: metody, template’y, routing?
jeszcze prostrzy refaktoring (blad kompilacji jesli metoda nie istnieje albo w kontekscie templateu czegos nie ma)

# Problems and further ideas.
typowanie w template’ach
















Examples for different formats and css features

#Header Formats
#Header1
##Header2

#Blockquotes
>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus

#Lists
##orderd lists
1. one
2. two
3. three

##unorderd lists
- Apple
- Banana
- Plum

#Links
This is an [example link](http://example.com/ "With a Title").

#Combinations
>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
>
> - Apple
> - Banana
> - Plum
