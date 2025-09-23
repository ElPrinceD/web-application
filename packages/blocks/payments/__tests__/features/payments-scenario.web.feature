Feature: payments

    Scenario: User navigates to payments
        Given I am a User loading payments
        When I navigate to the payments
        Then payments will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors