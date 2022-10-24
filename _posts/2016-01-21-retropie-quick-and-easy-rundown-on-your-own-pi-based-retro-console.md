---
id: 322
title: 'RetroPie &#8211; Quick and easy rundown on your own Pi based Retro console!'
date: '2016-01-21T15:39:38-08:00'
author: Sargonas
layout: post
guid: 'http://sargonas.com/?p=322'
permalink: /retropie-quick-and-easy-rundown-on-your-own-pi-based-retro-console/

image: '/assets/article_images/imported/2016/01/splashscreen-825x510.png'
categories:
    - Gaming
    - Geekery
    - Maker-stuff
tags:
    - consoles
    - DIY
    - emulators
    - Gaming
    - geek
    - Geekery
    - guides
    - how-to
    - Pi
    - 'Raspberry Pi'
    - Raspbian
    - retro
    - RetroPie
    - ROMs
    - technology
    - 'video games'
---

I recently made a facebook post about setting up my RetroPie, and it spawned a lot of questions from folks on how I did it, how hard was it, etc. I figured if I just made a rundown on here about the whole process, it would be much easier to link to it than to repeatedly regurgitate the info over and over again.

…I’m lazy like that.

So, first off, the magic of having a retro “console” with a plethora of various platforms easily at your disposal comes thanks to the magic of the tried and true Raspberry Pi. Pi’s are powerfully little computers on a board the size of a credit card. The latest and greatest, known as the Raspberry Pi 2 are surprisingly powerful, with the B model (which have more USB ports) clocking in with a 900mhz quad core. They also have 1GB of ram, a dual core GPU, 4 USB ports, HDMI output, Ethernet, and a multiport GPIO block for various “shield” modules to be attached (TFT screen anyone?), all powered over a standard micro USB port… for about $39.00

In the case of mine, I went the “easy” route and got the [CanaKit](http://www.amazon.com/gp/product/B008XVAVAW/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B008XVAVAW&linkCode=as2&tag=sargonascom-20&linkId=5NJSR5U26YNMMAT5)![](http://ir-na.amazon-adsystem.com/e/ir?t=sargonascom-20&l=as2&o=1&a=B008XVAVAW)  
off Amazon. It has a RaspberryPi 2 B, a power adapter, wi-fi adapter, 8GB micro SD card, HDMI cable, and plastic housing all-in-one for only $69.99. It basically covers everything you need to make a RetroPie, minus a controller! (May I suggest an Xbox 360 controller for that part?)

[![file_4](/assets/article_images/imported/2016/01/file_4.png)](/assets/article_images/imported/2016/01/file_4.png)

After snapping it all together, the card already has Raspbian, the custom Pi-friendly flavor of Ubuntu, and you’re technically ready to go to setup RetroPie the “hard way”. To make life easier however, I just downloaded the latest [RetroPie image off their repo over at github](https://github.com/RetroPie/RetroPie-Setup), as it has a Raspbian install with all the RetroPie components as well as the slick UI called EmulationStation ready to go.

Once you image the file to your micro SD card with the tool of your choice (I just used the tools native to my Macbook Pro) you simply boot it up with an Xbox 360 wired controller plugged in, while connected to your TV, and you’re set! It really is THAT easy! It will auto boot right into EmulationStation, calibrate your controller, and then load right in. There are however a few extra steps to get the very most out of it. These are all covered step by step in the RetroPie how-to, but essentially it’s just a matter of going through the menu and expanding your file system so that the install sees the max SD card space available, and configuring your WiFi to remove the need for an ethernet cable.

[![raspi-config](/assets/article_images/imported/2016/01/raspi-config.png)](/assets/article_images/imported/2016/01/raspi-config.png)

To get ROMs onto your Pi, there are a few options available to you. The Pi will show up as a network share, and you can just drop the ROM files directly into the folder for the relevant console emulator from your PC/Mac. Alternatively, you can plug a blank USB thumb drive into the console and give it a few seconds to sync. Once done, you can pull it back out and place it into any PC/Mac you want, and you’ll now see that there is a new folder tree, named for each emulator platform. By dropping ROMs into the right folders and plugging it back into the RetroPi, it will automatically synchronize the folders with your Pi each time you do so. It’s handy, but I personally just stuck to dropping files into the network shares.

That’s really all there is to the basics. There’s a lot more customization and such you can do, but it’s sort of beyond the rundown I intended to provide here. This is more of a quick and dirty recap for my friends than meant to be an all-inclusive how-to for the internet at large, but there are TONS of other resources out there if you need more info.

One last thing.. if you \*really\* want to kick things up a notch, you can buy a module that plugs into the GPIO ports on the Pi and add SNES controller ports to your console. I’ve thought about it, but truth be told I’m pretty happy using an Xbox 360 controller. T[hat said, I’m currently working on 3D Printing a new case that’s shaped like a (miniature) classic NES.](https://www.thingiverse.com/thing:962488) Let me know if you want one printed! 😉

[![20150809_232422_preview_featured](/assets/article_images/imported/2016/01/20150809_232422_preview_featured.jpg)](/assets/article_images/imported/2016/01/20150809_232422_preview_featured.jpg)

Happy gaming!

[![12509554_10153356492590509_7193432881580109416_n](/assets/article_images/imported/2016/01/12509554_10153356492590509_7193432881580109416_n-e1453419544812.jpg)](/assets/article_images/imported/2016/01/12509554_10153356492590509_7193432881580109416_n-e1453419544812.jpg)