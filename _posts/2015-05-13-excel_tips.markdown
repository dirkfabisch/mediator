---
layout: post
title:  "Build Excel tools responsibly"
subtitle:  "Some good practices from the programmer's world"
author: damian
date:   2015-05-13 17:00:00
categories: technology
tags: Excel programming practices errors
image: /assets/article_images/2015-05-13-excel_tips/calculations.jpg
---

Excel is a great software that let's you build tools fast. People use spreadsheets on a daily basis to perform calculations or store important data. It's cheaper than building a dedicated software to handle those tasks and it's much faster as you don't need to talk to programmers every time a change is needed. However, as a wise man once said, with great power comes great responsibility. Internet is full of dreadful stories about big companies losing millions of dollars because of spreadsheet errors ([Spreadsheet mistake costs 100 million](http://blogs.wsj.com/moneybeat/2014/10/16/spreadsheet-mistake-costs-tibco-shareholders-100-million/)). So what should we do if we want to avoid mistakes but we want to have a fast solution? Today I’d like to share with you few good practices programmers follow when building software that help them avoid big amount of errors.

#So what should we do if we want to avoid mistakes but we want to have a fast solution?

##Hide and protect cells that have formulas

Don’t let users edit formulas. A lot of mistakes are caused by an unintentional formula change. Excel lets you easily hide and lock cells. Select a range of cells, right-click and choose Format Cells. Go to Protection tab, and set the Locked or Hide checkbox. You can also set the password there. Click OK and your formulas are safe!

##Validation

Don’t let users input wrong numbers. Use data validation so that every input is checked against defined conditions (for example you can make sure that user inputs value that is greater than 0 or is less than result of defined formula). For more information visit: [Excel data validation](https://support.office.com/en-nz/article/Apply-data-validation-to-cells-c743a24a-bc48-41f1-bd92-95b6aeeb73c9).

##Naming

Name your cells and ranges. The bigger your Excel gets the more difficult it is to remember what exactly does ```A15 * B6 - Z4 * 3``` formula do. Don’t just write ```= A1 * (1 + A2)```. Name cell A1 as “netPrice” and cell A2 as “VAT”. Then you can write ```= netPrice * (1 + VAT)```. In order to name a cell just select the cell and change the name in top left box (red selection):

<center>
    <img src="/assets/article_images/2015-05-13-excel_tips/excel_name.jpg" />
</center>

##Control versions

Keep track of all versions of your spreadsheet. Easiest way is to just include the creation date in the name of the file. Anytime you change the spreadsheet make a copy of it first and change the date to today. This way you will have a complete history of your changes. Same thing is possible if you use Sharepoint that keeps older versions of your documents and allows you to go back to previous files in case an error was introduced in a new one.

Programmers use a more powerful tool to control new versions of software. Code is often written by more than one programmer. It would be impossible to keep track of all changes and keep the code consistent if it hadn’t been for version control systems (git, svn and others). We use tools like github that let us see any change made by our colleague online and comment it. Not only do we keep history of versions but we also see what exactly has changed between two versions.
<center>
    <img src="/assets/article_images/2015-05-13-excel_tips/github.png" />
</center>

On the left I see an old file and on the right I see a new one. My colleague changed height from 6 to 3 (em - is a unit of measure). I can write a comment and ask him to change it to another value.

Office allows you to track changes but it’s not that powerful. If you need a better version control for Excel there are some projects like http://spreadgit.com/ that introduce tracking changes to spreadsheets. We have also built a product that let’s you build software by writing Excel-like formulas separately and manage them in tools like github, but that’s a story for another time.

##Testing


Anyone who edits a formula can introduce an error. It may be a mistake or misunderstanding. You can change a plus into a minus and it may go unnoticed.

In the world of Computer Science programmers write a lot of tests to the code they write. Tests basically say that for the given input the result of the written formula should be equal to the given result. For example if you state that A1 should be equal to ```A2 + A3``` you can verify this by writing a test “if A2 is 1 and A3 is 3 then A1 should equal to 4”. If another person changes your code and writes that A1 equals to ```A2 - A3``` then the test will fail and inform you that having A2 as 1 and A3 as 3, we get A1 = -2, not 4 which means that you have an error.

Testing formulas in Excel is not that easy as in programming. However you can do it manually by creating a separate sheet in which you keep sample data. Then after you make changes to your spreadsheet you can copy the values and see if all formulas evaluate to desired output.

For more advanced users: you can use Visual Basic to create simple tests with macros. Just write:

```
Range("A2").Value = 1
Range("A3").Value = 3
Debug.Assert (Range("A1").Value = 4)
```

What is more, you can use your named cells here:

```
Range("netPrice").Value = 100
Range("VAT").Value = 0.23
Debug.Assert (Range("grossPrice").Value = 123)
```

Write as many tests as you want and run them after any change is made to make sure new changes don’t introduce unwanted errors. This gives you control and stability.

Excel is a great software that let’s you build even complex tools easily. Don’t forget that this makes it very easy to introduce errors. Be careful and wise. Protect your users and yourself from making mistakes and it will pay off in the long term.
