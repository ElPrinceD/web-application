Feature: catalogueService

    Scenario: User navigates to catalogueservice
        Given I am a User loading catalogueservice
        When I navigate to the catalogueservice
        Then catalogueservice will load with out errors
        Then catalogueservice will load data with internal module
        Then catalogueservice will load data from API
        When User go to my account
        Then User will navigate to the user profile page
        And I can leave the screen with out errors