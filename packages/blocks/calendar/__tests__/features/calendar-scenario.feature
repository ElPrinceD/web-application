Feature: calendar

    Scenario: User navigates to calendar
        Given I am a User loading calendar
        When I navigate to the calendar
        Then calendar will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors