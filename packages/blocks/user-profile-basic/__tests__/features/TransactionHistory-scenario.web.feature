Feature: TransactionHistory

    Scenario: User navigates to TransactionHistory
        Given I am a User loading TransactionHistory
        When User comes to the TransactionHistory
        Then Token get saved
        Then TransactionHistory will load with out errors
        And I can change order id to see the related list
        And I can click on filter icon
        And I can change the filter fields
        And Should call getTransactions on scroll to the bottom of the table container
        And User can leave the screen without error