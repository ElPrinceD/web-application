Feature:  OnboardingPageWeb

    Scenario: Onboarding Page
        Given I am a User loading the OnboardingPageWeb
        Then OnboardingPageWeb will load with out errors
        When I click the Login button
        Then It will navigate to LoginScreen
        When I click the cards
        When I click the cards on tablet
        Then I can leave the screen with out errors
        When I click on toggle button
        Then Drawer should open
        When I click on renotary logo
        Then It will navigate to Landing Page