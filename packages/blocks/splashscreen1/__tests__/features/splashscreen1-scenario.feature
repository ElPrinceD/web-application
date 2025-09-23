Feature: splashscreen1

    Scenario: User navigates to splashscreen1
        Given I am a User loading splashscreen1
        When I navigate to the splashscreen1
        Then splashscreen1 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors