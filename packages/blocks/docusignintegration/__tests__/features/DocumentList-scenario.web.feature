Feature: DocumentList

    Scenario: User navigates to DocumentList
        Given I am a User loading DocumentList
        When I navigate to the DocumentList
        Then DocumentList will load with out errors

        When end user clicks on eye button
        Then the document opens

        When the end user click on download button
        Then the document gets downloaded

        When end user signs one document
        Then one document is signed

    Scenario: Notary User navigates to DocumentList
        Given I am a notary user loading DocumentList
        When I navigate to the DocumentList
        Then DocumentList will load with out errors

        When notary user starts docusign for one document
        Then docusign is started for one document