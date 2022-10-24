---
id: 393
title: 'My franken-code'
date: '2016-05-28T22:20:31-07:00'
author: Sargonas
layout: post
guid: 'http://sargonas.com/?p=393'
permalink: /my-franken-code/

image: '/assets/article_images/imported/2016/05/ultimaker3-825x510.jpg'
categories:
    - Geekery
    - Maker-stuff
tags:
    - '3D Printing'
    - coding
    - css
    - development
    - Geekery
    - github
    - heroku
    - html
    - Maker
    - programming
    - rails
    - ruby
    - technology
---

So i have this little hobby, 3D Printing. You may have seen one or two (or fifteen) mentionings of it before. I love it, and I even make a reasonable amount of money on the side that covers the costs of my hobby and then some.

The one thing I love is numbers, tracking, and data all nicely packaged up in nice report with charts and graphs. Since plastic filament is the one main consumable in this venture, and it’s important to know how much filament you have left on a spool before starting the next print, I made a mildly complicated spreadsheet to help with this.

It’s a fairly straightforward spreadsheet. One tab holds the data for each spool of filament I own, another is a list of every print I have made over the last year (time spent, amount of filament used, profit/cost of prints, and so on. Lastly, a pretty little tab that shows cost/expenses, wear and tear on particular nozzle heads and other consumables. All in all it does the job, but the one thing that bugs me is that it’s just a spreadsheet. I want a web app that I can use anywhere any time, even mobile, to help make it easier (so I’m not batch logging prints days later because I’m lazy or was in a hurry) and more importantly one that supports multiple users so that others can use this same thing. I tried poking around on the web, but just couldn’t seem to find anything of the sort.. I find this kind of weird, but also may just be that due to some of the common search terms that have some crossover meaning here I might just have a blind spot in my google-fu.![Screenshot 2016-05-28 22.12.51](/assets/article_images/imported/2016/05/Screenshot-2016-05-28-22.12.51-1024x578.png)

Enter my project, [AnvilTracker.](https://github.com/sargonas/AnvilTracker) It’s basically an attempt to convert the functionality of that spreadsheet to a Ruby on Rails app. The fun part?

I have no idea what I am doing.

Basically I’ve gotten it to a mostly functional state. It’s not pretty (virtually no styling or UX work at all has been done) and the functionality is basically 75% of the spreadsheet minus a few cosmetic enhancements. I more or less started off with following some tutorials, cherry picking stuff that did what I wanted (just had a different use case) and renamed some stuff, gave variables more contextual names, and commented things up properly. So far so good..

![Screenshot 2016-05-28 22.08.56](/assets/article_images/imported/2016/05/Screenshot-2016-05-28-22.08.56-1024x555.png)

I think the biggest thing from holding me back is the freaking UX. I don’t have the patience to learn CSS on top of everything else. I’ve also created a monumental backlog of features I want to add, learning them incrementally as I go. So far it’s going ok, but the backlog is getting progressively harder and sooner or later I’m gonna hit my skillcap… oh yeah, don’t even ask me about Unit Tests ok? 🙁

Anyone care to lend a hand?

https://github.com/sargonas/AnvilTracker/issues