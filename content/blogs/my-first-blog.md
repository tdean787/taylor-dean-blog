---
title: Reducing Salesforce Formula Field Complexity with Apex
date: June 17, 2022 9:00 AM
---
# Introduction

One of the most powerful types of custom fields in Salesforce is the formula field. It offers a ton of versatility and can often solve a wide array of business problems. It can reference other fields, return data in many different types, and will also automatically be updated on every record it is placed. However, a formula field might not always be the right choice for the job. 

## Pitfalls of Salesforce Formula Fields

While a formula field can offer a lot of power out of the box, it can potentially lack scalability. Recently, I encountered a custom formula that was built to return a formatted string of values based on the options that were chosen in a multi-select picklist.

![Passing Multi-Select Values From One Object to Another Object – Jenwlee's  Salesforce Blog](https://jenwlee.files.wordpress.com/2018/01/multi-select-picklist-seal.jpg?w=288&h=225)

In the formula's final form, we were left with a field that contained *313 words of text*. The logic contained in the formula would check each option in the multi-select picklist and if it was selected, replace the value with the plaintext followed by a comma.

Exhibit A:

`IF(INCLUDES(Opportunity.MultiSelectPicklistValue__c, "Baby Seal"), "Baby Seal,", NULL)`

Rinse and repeat for 20+ lines, essentially.



## Challenge