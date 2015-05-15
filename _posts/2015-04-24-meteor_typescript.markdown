---
layout: post
title:  "Meteor + TypeScript = <3"
subtitle:  "Why you should use TypeScript for Meteor projects and how to start? Introducing meteor-typescript-utils."
author: marek
date:   2015-04-29 14:52:17
categories: technology
tags: TypeScript meteor open-source
image: /assets/article_images/2015-04-24-meteor_typescript/Cosmic_Fireball_Falling_Over_ALMA.jpg
---

It was big news for the web development community when Google & Microsoft announced that Angular 2 will be built with TypeScript. Lack of static typing in JavaScript often lets bugs get into the codebase unnoticed. This is especially true in the magical world of Meteor, where the ability to built awesome apps amazingly fast comes at a cost. TypeScript compiles to JS and lets you regain the safety of the static-typing.

We’ve been using TypeScript in development for more than a year now and now that we became fans of Meteor it was crucial for us to make it run on TypeScript. Although there are still some rough edges, it has worked brilliantly and already saved us a lot of time.

#It’s painful to build <u>large</u> Meteor projects with pure JavaScript
Dynamic typing in JavaScript surely streamlines writing code, especially at the beginning, but it makes development much more costly as the project moves on. Function declarations bear no meaning about the types of the arguments and bad design is encouraged. It also limits support the IDEs can give. In contrast, static typing turns code into its own documentation and lets the IDEs support refactoring extensively, while acting as the first layer guarding against introduction of errors.

Meteor’s design makes it extremely easy to start building impressive applications. However, this comes at a cost of things being magically matched between files by their names and injected in various places. This is especially true when you’re using the great Iron:Router package, which provides URL routes, controllers and layouts. It’s just too easy for changes to break things, since all the matching of methods names, session variable names, templates’ helpers, events and data is done by their string names and all related errors happen on runtime.

Meteor projects often struggle with regression errors, that could be eliminated by compile-time verification. Refactorings are complicated and the possibilities for IDE support limited.

# What is TypeScript?

TypeScript is a language compiled to JavaScript. Since it’s a superset of JS, every JS program becomes a TypeScript program once you change the file extension to `.ts`. TypeScript introduces static types, classes, modules and lambda functions, all compiled to readable code that could have been written by an experienced JavaScript developer. Essentially, it provides static types + a ton of features from upcoming ECMAScript standards (ES6 and even ES7).

One of the crucial features is the possibility to describe existing JS libraries' APIs with _typings_. Interestingly, in addition to documenting the libraries this process often has the side effect of revealing some poorly designed points in many of them.

#OK, so how to benefit from both Meteor and TypeScript?
Here’s how we dealt with those problems by using statically typed TypeScript. We did this in two steps.

The first step is to write as much as possible of the logic in well-structured and statically-typed object-oriented code, independent from Meteor. This is advisable anyway, but especially useful with static typing. What’s left for Meteor are mostly thin wrappers for templates, collections and methods, which are written in TypeScript as well, but with static typing turned off (by using the `any` type).

The second step is to move the integration further and use a set of wrappers around core Meteor features, which add static typing to method calls, templates and route controllers. Although there is still much to be done, we’re open-sourcing this set of wrappers today.

## Configuring project compilation
We recommend writing Meteor apps in TypeScript by keeping TypeScript code with the Meteor app and compile it into three files: `client/client.js`, `server/server.js` and `lib/shared.js`. There is the [meteor-typescript-compiler](https://github.com/meteor-typescript/meteor-typescript-compiler) package, but it not ready to be used yet, since it cannot handle multiple interdependent TypeScript files. (if anything changes, please let us know!)

Compilation can be done manually with:

```
tsc server/**/*.ts --out server/server.js -target ES5
tsc client/**/*.ts --out client/client.js -target ES5
tsc shared/**/*.ts --out lib/shared.js -target ES5
```

This can be nicely automated e.g. with Gulp. You can use our config as a starter.

Another option is to use _tsconfig_, which is a new way of describing TypeScript projects introduced in version 1.5. The downside is that with the `--out` option it does not support multiple compilation targets, so there's some hacking needed if you want to build into client, server and shared files.

## Meteor typings and dataflows:typescript-utils package
The set of wrappers is located at [github.com/dataflows/meteor-typescript-utils](https://github.com/dataflows/meteor-typescript-utils) and can be installed with:

```meteor add dataflows:typescript-utils```

You will also need typings for the wrappers and for Meteor standard API, so that they can be used in TypeScript code with static types. You can simply copy over the `typings` directory from the repository into your project.

There is a sample app built with this setup located at [github.com/dataflows/meteor-typescript-utils-example](https://github.com/dataflows/meteor-typescript-utils-example). This repository also contains the Gulp configs, so that you can `gulp run` to compile and start Meteor and `gulp make` to just recompile your TypeScript code.

## Blaze templates

One of the most common constructs in Meteor are Blaze templates. A typical template code rewritten to TypeScript looks pretty much like the same template in JavaScript. Having set up the compilation we can already write them in TypeScript like this:

{% highlight javascript %}
/// <reference path="../../../typings/meteor/meteor.d.ts"/>
Template["AppsListMenu"].helpers({
  "disabledValue": function(): string {
    return this.user.isAdmin ? "" : "disabled";
  }
});
Template["AppsListMenu"].events({
  "click .create-app-button": function(): void {
    Meteor.call("createApplication", {},
      function(error: Meteor.Error, result: string): void {
          if (error) {
            return console.log(error.reason);
          }
          Router.go("AppsDesigner", {appId: result});
      });
  }
});
{% endhighlight %}

Although this gives static types information in some places, there are still a lot of variables which are typed as `any` here. Most troubles are caused by the fact that we don't have any information about the variables injected into `this` by Meteor, such as data from the route controller or the parent template. For example, the compiler would accept `this.someUndefinedVar.whateverNonexistentProperty` just as it accepts `this.user.isAdmin`.

With `dataflows:typescript-utils`, you can write templates, methods and route controllers in a safer and, arguably, more elegant way. To write template code, we start by defining the types for the injected data:

{% highlight javascript %}
class AppsListMenuData {
  selector: string;
  user: IUser;
  id: number;
}
{% endhighlight %}

Next, we define a context class containing helpers and event handlers. They are identified by `@MeteorTemplate.helper` and `@MeteorTemplate.event(...)` decorators (which are by the way one of the newest TypeScript features, a fruit of the cooperation with the Angular team).

{% highlight javascript %}
///<reference path="../lib/MeteorTemplate.ts"/>
class AppsListMenuTemplateContext extends AppsListMenuData {
    @MeteorTemplate.helper
    disabledValue(): string {
        return this.user.isAdmin ? "" : "disabled";
    }

    @MeteorTemplate.event("click .create-app-button")
    createAppClick(): void {
        Meteor.call("createApplication", {},
            (error: Meteor.Error, result: string): void => {
                if (error) {
                    return console.log(error.reason);
                }
                Router.go("AppsDesigner", {appId: result});
        });
    }
}
{% endhighlight %}

Finally, we define the template class itself and simply register it in Meteor:
{% highlight javascript %}
class AppsListMenuTemplate extends MeteorTemplate.Base<AppsListMenuData> {
    constructor() { super("AppsListMenu", new AppsListMenuTemplateContext()); }
    rendered(): void {
        $(this.data.selector).dropdown();
    }
}

MeteorTemplate.register(new AppsListMenuTemplate());
{% endhighlight %}

# If that’s not enough - problems and ideas for the future
There is plenty of things that are not yet done or could be done better in the package. It could provide a wrapper for declaring and using collections. It could require less boilerplate. Methods could automatically verify argument types with `check` using the types declared in the method signature. It would be amazing to have available helpers verified in the templates' HTML files. Any ideas? Feel invited to contribute!

## Summary
Using TypeScript with Meteor can hugely streamline development, especially thanks to easier refactorings, more sensible IDE support and catching bugs at an earlier stage. I'd like to encourage you to take Meteor&TypeScript for a spin with the [bootstrap project](https://github.com/dataflows/meteor-TypeScript-utils-example). Our experiences led us to building the set of wrappers we're sharing today. They're not production ready, but certainly usable. We hope that you'll find them as useful as we do and help us improve them to make Meteor and TypeScript integration even smoother!
