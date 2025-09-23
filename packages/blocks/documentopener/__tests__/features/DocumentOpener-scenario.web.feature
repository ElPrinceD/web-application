Feature: DocumentOpener

    Scenario: User navigates to DocumentOpener
        Given I am a User loading DocumentOpener
        When I navigate to the DocumentOpener
        Then DocumentOpener will load with out errors

        When user clicks on back arrow button
        Then component will unmount