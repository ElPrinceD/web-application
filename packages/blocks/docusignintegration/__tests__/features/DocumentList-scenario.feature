Feature: DocumentList

    Scenario: User navigates to DocumentList
        Given I am a User loading DocumentList
        When I navigate to the DocumentList
        Then I can click open button with out errors