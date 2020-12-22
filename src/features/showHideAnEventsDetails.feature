Feature: Show or hide an events details

Scenario: An event element is collapsed by default
Given the list of events has been loaded
And app loaded
When the user did not click the details button yet
Then the event elements are collapsed by default

Scenario: User can expand an event to see its details
Given app loaded 
And the list of events has been loaded
When user clicks on the event's details button
Then the event element should expand to reveal its details

Scenario: User can collapse an event to hide its details
Given app loaded
And event element is expanded and shows details
When user clicks on the event's details button
Then the event element should collapse to hide its details
