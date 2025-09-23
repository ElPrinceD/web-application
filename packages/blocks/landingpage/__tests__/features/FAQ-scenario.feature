Feature: FAQ

    Scenario: User navigates to FAQ
        Given I am a User loading FAQ
        When I navigate to the FAQ
        Then FAQ will load with out errors
        When I click on list without errors
        Then List data will show
        When I click on list without errors
        Then List data will show with empty data
        And I can leave the screen with out errors
