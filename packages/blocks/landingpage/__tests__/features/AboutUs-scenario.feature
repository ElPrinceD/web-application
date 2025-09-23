Feature: AboutUs

    Scenario: User navigates to AboutUs
        Given I am a User loading AboutUs
        When I can review the about us content page
        Then AboutUs page content will load with out errors
        And I can review the about page content
        And I can leave the about us screen
