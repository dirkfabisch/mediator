---
id: 511
title: 'Rito Points, an Ethereum blockchain token!'
date: '2017-05-16T01:49:26-07:00'
author: Sargonas
layout: post
guid: 'http://sargonas.com/?p=511'
permalink: /rito-points-an-ethereum-blockchain-token/

image: '/assets/article_images/imported/2017/05/rpheader.png'
categories:
    - Geekery
tags:
    - altcoins
    - bitcoin
    - 'crypto currency'
    - ethereum
    - riot
    - rito
    - 'rito coin'
    - 'rito points'
    - RP
---

So a bunch of us at work are into Crypto currencies, both investing and mining, as well as some tinkering around with some of the more technologically-fun things we can do with it.

As a means to tinker even more with some of the exciting fun stuff you can do with custom tokens on the Ethereum block chain, I’ve created a custom token for us, playfully named the Rito Points. It can be stored/sent/received with any Ethereum wallet, just like any other Token, so long as your wallet software supports tracking them (also known as contracts). (In the event your wallet does not already know how to “watch” the Token, you can still receive them, but just not see or interact with them until you load the contract.)

[MyEtherWallet.com](http://myetherwallet.com) is a great place to start if you need a wallet that can be taught to see custom tokens, and the default Ethereum Wallet/mist installs work well too (*but they do require downloading and indexing the whole Ether chain!*) Since I expect I’ll be sharing instructions a lot for folks on how to configure their wallet to “see” Rito Points on the blockchain, I figured I’d just document it here for easy reference. Know that *any* Ethereum address can receive any custom token, including Rito Points, regardless of if the below steps are done, but you won’t be able to see them or manipulate them until you do so. My instructions will be for MyEtherWallet.com but will work for any wallet that supports smart contracts.

1. Log into your MyEtherWallet, and on the left hand menu select “**Add Custom Token**” (in some other apps this will be called **“Watch Contract”** or **“Watch Token”.**)
2. Under address, enter `<strong>0x8ea88ddefa3b470b51c108475ed2073845a3944c</strong>`  
    *(In a perfect world, the remaining fields will auto-complete for you. In case they do not, use the following:)*
3. Under Token Symbol enter `<strong>RP</strong>`
4. Under Decimals enter `<b>4</b>` *(I tried to keep it simple yet flexible.)*

<figure aria-describedby="caption-attachment-516" class="wp-caption aligncenter" id="attachment_516" style="width: 660px">![](/assets/article_images/imported/2017/05/Screen-Shot-2017-05-16-at-9.54.42-AM-1024x634.png)<figcaption class="wp-caption-text" id="caption-attachment-516">A screen shot of the contract watch panel within Ethereum Wallet/Mist</figcaption>That’s it! Your wallet now “knows” about Rito Points and can track it’s balance of it as well as send it!

***Update!*** *After tinkering with learning more about the Solidity scripting for the smart contracts, I whipped up a new contract that will accept ETH (in incredibly small amounts) and in return send you some RP to the same address that sent the ETH. The conversion rate is roughly 1,000 RP per .01 ETH (Just under a $1 at current rates). This was purely a learning test as well as a method to automate sending our RP to select interested parties while maintaining an ETH balance to cover TX fees… not an attempt to make any ETH, so please don’t wipe out my account! 😉 To leverage it, just send ETH to the following: `0xdFD326B2C0627Cf37757A790cb72a7861bc72037`*

Contract Explorer, for the curious: <https://ethplorer.io/address/0x8ea88ddefa3b470b51c108475ed2073845a3944c>