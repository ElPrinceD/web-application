Feature: Calendars

    Scenario: User navigates to Calendars
        Given I am a User loading Calendars
        When User navigates to Calendars
        Then Calendars will load without errors
        And I can change the tab from calendar header
        And User can leave the screen without error

    Scenario: User navigates to Calendars and click on book now button
        Given I am a User loading Calendars
        When User navigates to Calendars
        Then User can click on book now button
        And User can leave the screen without error
        