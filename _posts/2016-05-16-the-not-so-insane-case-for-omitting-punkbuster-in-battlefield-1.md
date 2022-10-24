---
id: 379
title: 'The (not so insane) case for omitting Punkbuster in Battlefield 1'
date: '2016-05-16T11:43:18-07:00'
author: Sargonas
layout: post
guid: 'http://sargonas.com/?p=379'
permalink: /the-not-so-insane-case-for-omitting-punkbuster-in-battlefield-1/

image: '/assets/article_images/imported/2016/05/rendition1.img_.jpg'
categories:
    - Gaming
    - Rants
tags:
    - anti-cheat
    - battlefield
    - BF1
    - EA
    - Gaming
    - Opinions
    - Origin
    - punkbuster
    - technology
    - 'video games'
---

The early 2000s were a dark time in the FPS world. In the days of old, cheating was rampant, as anyone from the original Counter-Strike days can tell you. There is a saying in the anti-cheat world: “Build a better mousetrap, and they will build a better mouse.” The problem, however, was that for a many number of years, no one was even *building* mouse traps.

Enter Punkbuster, a creation of a coalition of angry gaming community people who were tired of the rampant cheating. At the time time, it was a godsend. You, the run-of-the-mill server administrator, could drop this module into your game server, tweak a few settings, and now the mice had a mousetrap to contend it. Was it perfect? No. Was it infallible? Nope. Did it at least help? You betcha!

[![pb_logo.jpg.001df605df50c667e70c4a0ffad2d609.jpg.3f648d6a10f78a71f65f28fe881890b3](/assets/article_images/imported/2016/05/pb_logo.jpg.001df605df50c667e70c4a0ffad2d609.jpg.3f648d6a10f78a71f65f28fe881890b3.jpg)](/assets/article_images/imported/2016/05/pb_logo.jpg.001df605df50c667e70c4a0ffad2d609.jpg.3f648d6a10f78a71f65f28fe881890b3.jpg)

The mice evolved, and so did the mouse trap. Over time the storied tug of war of hacks vs. anti-cheat escalated as they always do, but this option held back the great unwashed masses of many an offender. There were false positives, there were people who would steal others GUIDs (Global Unique ID) and get them banned for fun, and there were other headaches… *but it was an* *opt-in system*. A game server admin could elect to turn on or off any part of the system at will, (or the whole system entirely). The cost benefit analysis was up to the server admin and their community to agree upon, so there were few surprises and consequences were manageable.

This brings us today… 2016. A far, far cry from the early 2000s. These days, first party anti-cheat systems are on the rise… and they are quite impressive pieces of technology. Blizzard’s “Warden”, Valve’s “VAC”, and so on, have set the standard for first party solutions. These systems outclass Punkbuster in many ways, especially in the false positive category, but *most* importantly, they are *in house*. The studio using them, *also controls them*. This is key! Accountability of the actions (and results) of these systems lie within the same walls as the platform on which they operate. It’s quite easy for Blizzard to go “oh crap, something went sideways for this guy, let’s reverse this ban.” or, as has happened before here at Riot, for a player to be banned for botting, only for our support staff to see clear evidence of an account compromise during that time frame and go “yeah it’s plain as day this wasn’t you” and reverse the ban during account recovery.

**So, let me explain why this whole thing is in my head, and why I think Punkbuster has no place in Battlefield 1…**

[![ea-origin-logo](/assets/article_images/imported/2016/05/ea-origin-logo-300x169.jpg)](/assets/article_images/imported/2016/05/ea-origin-logo.jpg)

In 2011, when Battlefield 3 came out (and repeated again with BF4 in 2013), DICE made the curious move to incorporate Punkbuster into the game as a required component. If a Battlefield 3(or 4) server is publicly accessible (meaning, not flagged to private and locked out to most folks), PB \*must\* be enabled on the server. *No exceptions*. This wasn’t, to the best of my knowledge, common before now. Some other studios had indeed bundled PB with their game’s dedicated servers, sure, but a forced-on implementation was a new one, at least from my understanding. Now, to be sure, it helped. It kept the game a lot saner than it could have been, that’s for sure!

Now, BF3 was one of the first major EA releases to come out in 2011 after the launch of Origin, and as such, was only available on that platform. One of the side effects of this was that your GUID tracked within Battlefield (and consequently PB) is keyed off of your Origin ID. No longer a hash of your computer hardware and game-specific username, this new format essentially “follows” your Origin account wherever it may be logged in, regardless of the computer in question.

For a while, when Origin was new, it was a bit behind in some technical areas. Having been around the team during that time, some really tough decisions had to be made about what was required for launch and what could be added down the road. This is a common decision making process at any studio and tech company, to ensure something was there for players in time for some key milestones and dependencies. This meant account security was a bit hit or miss for the first two years due to a lack of 2 Factor Authentication, for example. As a result, in late 2013 or early 2014 (my memory is hazy) there was a rash of account compromises in bulk that were seemingly part of some form of data breach. I, like *many* people, had my account compromised by (what at least appeared to be) a conglomerate of Russian hackers. This went unnoticed by me for a few months, as no new releases came out to garner my attention and warrant logging into Origin. Then, along comes Dragon Age: Inquisition, (SUCH a good game by the way!) and I tried to log in. Uh oh! I went through the account recovery process, turned on the newly established 2FA, and life was good.

Then recently, in a wave of nostalgia with friends, I fired up Battlefield 3. Imagine my shock when I find out that every server I connect to instantly kicks me. Reading through the logs on a server I had control over, I come to find out my GUID is on the Punkbuster master ban list, and was added to it in early 2014! This ban extends to not only BF3, but \*ANY\* game that leverage Punkbuster who’s authentication methods stem from Origin. (IE all Dice games).

I have a string a documentation proving my account was compromised, Origin willingly acknowledges this issue. Punkbuster? Not a care is given to this. If one tries to appeal to Origin, they response is always the same “We have no control or authority over Punkbuster and all concerns on that need to be addressed to Even Balance.” On the Punkbuster side, any appeals to Even Balance fall on deaf ears. “We have no ownership over account security for Origin. Our only concern is that your GUID was linked to cheating, and placed on the master ban list. All decisions are final and irreversible.”

[![DICE_EA_Logo_Black](/assets/article_images/imported/2016/05/DICE_EA_Logo_Black-300x168.jpg)](/assets/article_images/imported/2016/05/DICE_EA_Logo_Black.jpg)

So, this brings me to the point of this post: **EA/Origin, by way of DICE, has turned over the keys to the kingdom for account bans for a subset of games to Punkbuster, a community controlled system. This third party, with no accountability or liability to EA, has the ability to say “you are hereby banned from all Origin games using PB” (which is this case is all DICE titles), because We Say So.**

How is it, that a multi-million dollar publisher thinks it is a player-friendly, pro-consumer policy to say “you know what, let’s allow this other company whom we have no influence over to unilaterally ban our players, with no avenue for recourse by them or even ourselves.” Seriously. How does this make sense to anyone? If Battlefield 1 decides to ship with Punkbuster support, my account will be locked out of playing in any public online servers because of an account compromise that was beyond my control. Why on earth would I pay money for that experience?

Cheating is bad. It needs to be guarded against… but why can’t Dice/EA/Origin, make an in-house solution instead? One that they can have oversight on? Blizzard does it. Valve does it. Riot does it. *Tons* of studios do it. You are telling me EA thinks this is a better plan? Please.

***Edit – 5/17/16 @ 10:23am:*** Curiously enough, when I woke up this morning I discovered my GUID was no longer on the master ban list. How it was removed I do not know, and I while I am grateful I can play again, it doesn’t really change how I feel about this situation, or the intent behind my post. Still, I *am* grateful to whomever looked me up and removed it.