Feature: quotemanagement2

    Scenario: User can input text into quotemanagement2
        Given I am a user loading quotemanagement2
        When I navigate to the quotemanagement2
        Then quotemanagement2 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User can toggle showing and hiding non-secure and secure text
        Given I am a user loading quotemanagement2
        When I navigate to the quotemanagement2
        Then the text will be shown in plain text
        Then I press the toggle secure text button and it will be displayed securely

    Scenario: User navigates away from quotemanagement2
        Given I am a user loading quotemanagement2
        When I navigate to the quotemanagement2
        Then quotemanagement2 will load with out errors
        And I can dismiss quotemanagement2

    Scenario: quotemanagement2 has event listeners for screen size changes added
        Given I am a user loading quotemanagement2
        When I load quotemanagement2
        Then the dimensions function has an event listener added

    Scenario: quotemanagement2 resizing events are triggered
        Given I am a user loading quotemanagement2
        When I load quotemanagement2 and change screen size
        Then the window change event is fired