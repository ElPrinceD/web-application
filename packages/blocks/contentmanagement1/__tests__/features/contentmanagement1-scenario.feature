Feature: contentmanagement1

    Scenario: User navigates to contentmanagement1
        Given I am a User loading contentmanagement1
        When I navigate to the contentmanagement1
        Then contentmanagement1 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors