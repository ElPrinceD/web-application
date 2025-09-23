Feature: RequestDetails

    Scenario: User navigates to RequestDetails
        Given I am a User loading RequestDetails
        When I navigate to the RequestDetails
        Then RequestDetails will load with out errors