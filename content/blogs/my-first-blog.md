---
title: Reducing Salesforce Formula Field Complexity with Apex
date: June 17, 2022 9:00 AM
---
# Introduction

One of the most powerful types of custom fields in Salesforce is the formula field. It offers a ton of versatility and can often solve a wide array of business problems. It can reference other fields, return data in many different types, and will also automatically be updated on every record it is placed. However, a formula field might not always be the right choice for the job. 

## Pitfalls of Salesforce Formula Fields

While a formula field can offer a lot of power out of the box, it can potentially lack scalability. Recently, I encountered a custom formula that was built to return a formatted string of values based on the options that were chosen in a multi-select picklist.

![(Save the Baby Seals) Dont Use Multi-Select Picklist Fields.jpg](https://trailhead.salesforce.com/trailblazer-community/download/file/0694S000000EwIWQA0)

In the formula's final form, we were left with a field that contained *313 words of text*. The logic contained in the formula would check each option in the multi-select picklist and if it was selected, replace the value with the plaintext followed by a comma.

Exhibit A:

`IF(INCLUDES(Opportunity.MultiSelectPicklistValue__c, "Baby Seal"), "Baby Seal,", NULL)`

Rinse and repeat for 20+ lines, essentially.

## Challenges Faced

So when the time inevitably came to modify that picklist and add a new option, I needed to account for this formula and ensure the new option would be represented. I ran into a number of problems, from trying to determine the right section to place it in the formula, to nearly [hitting the formula character limit of 3,900 characters](https://help.salesforce.com/s/articleView?id=sf.formula_field_limits.htm&type=5). Given the number of difficulties faced all as part of what should have been a simple change to the org, I opted to explore other options with the goal of ultimately removing the formula field entirely.