Feature: CalendarSync

    Scenario: User navigates to CalendarSync
        Given I am a User loading CalendarSync
        When I navigate to the CalendarSync
        Then CalendarSync will load with out errors
        And User can click google_authenticate button
        And User can switch the google_sync button
        And User can click outlook_authenticate button
        And User can switch the outlook_sync button
        And User can remove the connected account
        And I can leave the screen with out errors
        When I load page CalendarSync
        Then It loads fine without errors of api