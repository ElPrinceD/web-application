Feature: catalogue1

    Scenario: User navigates to catalogue1
        Given I am a User loading catalogue1
        When I navigate to the catalogue1
        Then catalogue1 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors