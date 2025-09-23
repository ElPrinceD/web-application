Feature: PrivacyPolicy

    Scenario: User navigates to privacypolicy
        Given I am a User loading privacypolicy
        When I navigate to the privacypolicy
        Then privacypolicy will load with out errors
        And I can leave the screen with out errors