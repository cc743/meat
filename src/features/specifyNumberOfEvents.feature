Feature: Specify Number Of Events

Scenario: When user has not specified a number, 32 is the default number
Given the user did not specify the number of events being shown
When app loaded
Then the default number of events shown is 32

Scenario: User can change the number of events they want to see
Given the list of elements have been loaded and the user did not specify a number of events he wants to see
When the user specifies a number
Then the maximum of events listed should be the specified number
