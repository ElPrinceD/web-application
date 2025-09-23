Feature: TransactionHistory

    Scenario: User navigates to TransactionHistory
        Given I am a User loading TransactionHistory
        When I navigate to the TransactionHistory
        Then TransactionHistory will load with out errors