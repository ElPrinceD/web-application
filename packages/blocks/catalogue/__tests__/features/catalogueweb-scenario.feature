Feature: catalogue

    Scenario: User navigates to catalogue
        Given I am a User loading catalogue
        When I navigate to the catalogue
        Then catalogue will load with out errors

        When User gets navigated to catalogue getProfile Api should get called
        Then User name is shown on the screen

        When User gets navigated to catalogue getServices Api should get called
        Then User name is shown on the screen

        When User gets navigated to catalogue getJurisdictions Api should get called
        Then User name is shown on the screen
