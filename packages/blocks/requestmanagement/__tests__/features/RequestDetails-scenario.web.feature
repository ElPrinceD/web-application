Feature: RequestDetailsWeb

    Scenario: User navigates to RequestDetailsWeb
        Given I am a User loading RequestDetailsWeb
        When I navigate to the RequestDetailsWeb
        Then RequestDetailsWeb will load with out errors

        When kyc status is null
        Then meeting and docusign tab will be disabled

        When kyc status is pending
        Then meeting and docusign tab will be disabled

        When kyc status is verified
        Then meeting and docusign tab will be disabled

        Then No quotes message will be shown for pending request

        Then Page will fetch cancellation charges after loading

        When getNotaryDetails, getQuotesList and getServices API Called
        Then User clicks on hamburger menu icon

        When User can review the vat into the qoute
        Then Vat is display on qoute and previoue qoute

        When user clicks on preview quote button
        Then preview quote modal opens

        When user clicks on close preview quote button
        Then preview quote modal closes

        When user clicks on preview quote button
        Then preview quote modal opens

        When user clicks on pay now button
        Then user is redirected to payment options page

        Given payment has failed and page loads
        When payment has failed
        Then payment failed modal is shown

        When User clicks on failure modal button
        Then user is redirected to payment options page

        Given payment is successful and page loads
        When payment is successful
        Then payment success modal is shown

        When User clicks on success modal button
        Then Success modal is closed

        Given page reloads
        When page is loading
        Then page is loaded

        When user changes tab to tracking details
        Then tracking details should be shown

        When user can click to kyc verification tab
        Then kyc verification tab should open

        When user can change to meeting tab
        Then meeting tab can be open

        When User receives unread messages
        Then Chat unread message count is displayed on the chat icon

        When User clicks on join meeting button
        Then Zoom meeting modal opens

        When User clicks on cancel button
        Then zoom meeting modal closes

        When User clicks on join meeting button
        Then Zoom meeting modal opens

        When user clicks on launch meeting button
        Then User will be redirected to zoom meeting

        When user clicks on cancel request for non cancellable request
        Then popup should open
        
        When User clicks on cancel request button
        Then cancel request modal should open

        When User clicks on no button of cancel request modal
        Then handleNoButtonClick should be called

        When User clicks on yes button of cancel request modal
        Then handleYesButtonClick should be called

        When User clicks on book now request modal
        Then Book Now modal should open

        When book now modal props

        When User clicks on back icon button
        Then The correct navigation method is called

        When Notary user navigates to Request details
        Then RequestDetailsWeb will load with out errors.

        When kyc status is null
        Then meeting and docusign tab will be disabled

        When kyc status is pending
        Then meeting and docusign tab will be disabled

        When kyc status is verified
        Then meeting and docusign tab will be disabled

        When Notary user can click on decline button
        Then Decline button on page load is visible

        When notary user clicks on make quote button
        Then make quote modal should open
        
        When notary user clicks on close make quote button
        Then make quote modal should close

        When notary user clicks on make quote button
        Then make quote modal should open

        When notary user clicks on decline make quote button
        Then make quote modal should close

        When notary user clicks on make quote button
        Then make quote modal should open

        When user leaves fees empty
        Then fees should be empty

        When user enters wrong fees
        Then fees should not be entered

        When user enters 0 fees
        Then fees should be entered

        When user enters message
        Then message should be entered

        When user toggles VAT checkbox
        Then VAT checkbox is toggled

        When User clicks on submit quote button
        Then errors are displayed

        When user enters correct fees
        Then fees should be entered

        When user toggles video call checkbox
        Then video call checkbox is toggled

        When Notary user selects start time
        Then start time gets selected

        When Notary user selects end time
        Then End time gets selected

        When User clicks on submit quote button
        Then something goes wrong and quote is not submitted

        When Notary user selects end time
        Then End time gets selected

        When User clicks on submit quote button
        Then Quote is submitted

        When User clicks on success modal button
        Then Success modal is closed

        When User withdraws quote
        Then cancel request modal should open

        When User clicks on yes button of cancel request modal
        Then Quote is withdrawn

        When end user has accepted the quote
        Then meeting tab are shown to the notary user

        When user changes tab to kyc verification
        Then kyc verification tab should open

        When the user changes the document status in KnowYourCustomerKycVerification
        Then the state should update endUserDocStatus to true

        When end user clicks on eye button
        Then the document opens

        When the end user click on download button
        Then the document gets downloaded

        When End user click the view invoice button to review
        Then User can review the invoice document

        When End user can download their invoice in PDF format
        Then User can review download invoice document
    
    Scenario: User navigates to RequestDetailsWeb with no request parameters
        Given I am a User loading RequestDetailsWeb
        When I navigate to the RequestDetailsWeb
        Then RequestDetailsWeb will load with out errors

    Scenario: User navigates to RequestDetailsWeb and check chat data
        Given I am a User loading RequestDetailsWeb
        When I navigate to the RequestDetailsWeb
        Then RequestDetailsWeb will load with out errors
        Then User can leave this page with out errors
        Then User can send message with out errors

    Scenario: User interacts with Draft status request in Request Details
        Given I am a User loading RequestDetails with a draft request
        When Request Details loads with draft status
        Then Draft status specific elements should be rendered correctly
        When User clicks delete request button for draft request
        Then Delete confirmation modal should open with correct text
        When User confirms deletion of draft request
        Then Success modal should show delete confirmation
        When User clicks on success modal after deletion
        Then User should be navigated back
        Then Draft requests should show placeholder values for null fields

    Scenario: User interacts with invite request statuses
        Given I am a User loading RequestDetails with an invite request
        When Request Details loads with invite status
        Then Invite status and note should be displayed correctly
        When Request status changes to rejected
        Then Rejected status and note should be displayed correctly
        When Request status changes to accepted
        Then Accepted status should be displayed correctly
        When User is a notary viewing an invite request
        Then Status should show with 'D' suffix for notary
        When Testing status label generation
        Then Request status verification methods should work correctly

    Scenario: User navigates to RequestDetailsWeb with mark as completed api integration
        Given I am a User loading RequestDetailsWeb for mark as completed api
        When I click on button for open mark complete modal
        Then mark as completed warning modall open successfully
        When I call mark as completed api
        Then mark as completed api call successfully
        When I am getting error in  mark as completed api
        Then API error does not render on the screen
        Then Update the chat unread message count
        
        