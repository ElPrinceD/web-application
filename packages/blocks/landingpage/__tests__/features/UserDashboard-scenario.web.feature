Feature: UserDashboard

    Scenario: User navigates to UserDashboard
        Given I am a User loading UserDashboard
        When I navigate to the UserDashboard
        Then userDashboard will load with out errors
        And I can leave the screen with out errors