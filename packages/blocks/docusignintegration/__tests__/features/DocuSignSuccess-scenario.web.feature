Feature: DocuSignSuccess

    Scenario: User navigates to DocuSignSuccess
        Given I am a User loading DocuSignSuccess
        When I navigate to the DocuSignSuccess
        Then DocuSignSuccess will load with out errors

        When docusign status update has failed
        Then failure popup is shown

        When docusign status update is success
        Then success popup is shown

        When user clicks on check status button
        Then page will unmount

    Scenario: User navigates to DocuSignSuccess page

        Given I am a User loading DocuSignSuccess
        When I navigate to the DocuSignSuccess
        Then DocuSignSuccess will load with out errors

        When docusign generate Url api is called
        Then signingUrls are generated