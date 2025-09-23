Feature: adminconsole

    Scenario: User navigates to adminconsole
        Given I am a User loading adminconsole
        When I navigate to the adminconsole
        Then adminconsole will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors