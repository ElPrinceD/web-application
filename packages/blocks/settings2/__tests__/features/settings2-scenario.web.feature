Feature: settings2

    Scenario: User navigates to settings2 and inputs text
        Given I am a User loading settings2
        When I navigate to the settings2
        Then settings2 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to settings2 and inputs a password
        Given I am a User loading settings2
        When I navigate to the settings2
        And I want to enter a password
        Then settings2 will load with out errors
        And the text input field will be a password field
        And I can enter text with out errors
        And I can toggle to show the password
        And I can select the button with with out errors
        And I can leave the screen with out errors