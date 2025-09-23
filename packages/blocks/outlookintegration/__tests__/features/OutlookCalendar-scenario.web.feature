Feature: OutlookCalendar

    Scenario: User navigates to OutlookCalendar
        Given I am a User loading OutlookCalendar
        When I navigate to the OutlookCalendar
        Then I can click signup button

    Scenario: User navigates to OutlookCalendar and no data found
        Given I am a User loading OutlookCalendar
        When I navigate to the OutlookCalendar
        Then OutlookCalendar will load without error