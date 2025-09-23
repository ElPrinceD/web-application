Feature: UserProfile

    Scenario: User navigates to UserProfile
        Given I am a User loading UserProfile
        When I navigate to the UserProfile
        Then UserProfile will load with out errors