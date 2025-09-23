Feature: Services

    Scenario: User navigates to Services
        Given I am a User loading Services
        When I navigate to the Services
        Then Services will load with out errors
        When I scroll images without errors
        Then Image and content will change 
        And I can leave the screen with out errors
