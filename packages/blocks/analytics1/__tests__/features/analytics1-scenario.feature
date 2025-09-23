Feature: analytics1

    Scenario: User navigates to analytics1
        Given I am a User loading analytics1
        When I navigate to the analytics1
        Then analytics1 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors