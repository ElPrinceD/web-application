 Feature:KnowYourCustomerKycVerification



    Scenario:User move to KnowYourCustomerKycVerificationweb screen
        Given User can do KYC from this screen
        When I navigate to the KnowYourCustomerKycVerificationweb Screen
        Then I can enter a firstName in web with out errors
        And I can enter a lastName in web with out errors
        And I can enter a middlename in web with out errors
        And I can enter a email in web with out errors
        And I can enter a phonenumber in web with out errors
        And I can enter a nationality in web with out errors
        And I can enter a DOB in web with out errors
        And I can select Submit button in web without errors
        And I can load CreateAccount in web without errors
        And I can navigate Onfido page in web without errors
        And I can load onfido in web without errors
        And I can load OnreportApi in web without errors
        And I can leave the screen with out errors 


     Scenario:User can not create Kyc notary service
        Given User create KnowYourCustomerKycVerificationweb for any document
        When User navigate to the KnowYourCustomerKycVerificationweb Screen
        Then User Can see the list of the document

        When Notary User document kyc status is in pending status
        Then Notary User document kyc status pending ui will display
        

        

    Scenario:User can create Kyc notary service

        Given User can create kyc for any document
        When User navigate to the kyc Screen
        Then User can review the list of the documents
        When User can select single document for kyc
        Then User can see single document is checked
        When User unselects a single document
        Then User can see the document is unchecked

        When User can create KYC for selected document with complete result
        Then User can review the responce message with complete result

        When User can create KYC for selected document
        Then User can review the responce message


     Scenario:End User get Kyc notary list
        Given End User get KnowYourCustomerKycVerificationweb for any document
        When  End User navigate to the KnowYourCustomerKycVerificationweb Screen
        Then  User Can see the list of the document with status
        When  End User document kyc status is in pending status
        Then  End User document kyc status pending ui will display
        When  End user can review the form and review the added data
        Then  End User can review kyc form

        When  User can submit the kyc form
        Then  User found the validation error

        When User can submit the kyc form for invalid email
        Then User found the validation error on invalid email

        When User can submit the kyc form for long email
        Then User found the validation error on long email

        When  User can add the text input details and save value
        Then  User can review the saved value
        
        When User can submit the form for onfido verification
        Then user can stay on onfido verification box

        When User can submit the form for onfido verification with error
        Then user can stay on onfido verification box with error

        When user can close the kyc form
    








    