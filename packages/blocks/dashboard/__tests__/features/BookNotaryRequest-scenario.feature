Feature: BookNotaryRequest

    Scenario: User navigates to BookNotaryRequest
        Given I am a User loading BookNotaryRequest
        When I navigate to the BookNotaryRequest
        Then BookNotaryRequest will load with out errors