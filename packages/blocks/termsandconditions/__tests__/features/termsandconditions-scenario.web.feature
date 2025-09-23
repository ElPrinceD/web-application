Feature: TermAndConditions

    Scenario: User navigates to termsandconditions
        Given I am a User loading termsandconditions
        When I navigate to the termsandconditions
        Then termsandconditions will load with out errors
        And I can leave the screen with out errors