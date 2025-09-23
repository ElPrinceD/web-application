Feature: RequestManagement

    Scenario: User navigates to RequestManagement
        Given I am a User loading RequestManagement
        When I navigate to the RequestManagement
        Then RequestManagement will load with out errors
        
        When User come to the request management screen
        Then Get token function shoudl be called
        When User Profile api get called
        Then User Detail get show on the screen
        When AllRequest show api get called
        Then AllRequest will show on the screen
        When Create request api will call
        Then Create request api get called
        When User click on three Dots button
        Then View Modal will call successfully
        When notary request view button is clicked
        Then should call getNotaryRequestDetails on button click

        When user clicks on cancel request for pending request
        Then cancel request modal opens
        
        When user clicks on cancel request for non cancellable request
        Then popup should open

        When I click on meeting button
        Then The api will call

        When The api will call
        Then The meeting will display on the screen
        
        When Clicked on cancel button for non-cancellable request
        Then Failure modal is shown

        When User clicks on failure modal button
        Then failure modal closes

        When Cancel request button is clicked
        Then Cancel Request Modal should open
        When User clicks on the Edit button for a notary request
        Then The Edit Request modal should open
        When User clicks on yes button of cancel request modal
        Then handleYesButtonClick should be called
        When User clicks on no button of cancel request modal
        Then handleNoButtonClick should be called
        When User login and come to request management again with notary user
        Then Get Profile API will call successfully for notary user
        When Notary user click on the ongoing Request
        Then Ongoing request will be selected
        Then ServiceData will show
        When User scrolls near the bottom of the request list
        When loadMoreRequests is called
        Then The currentPage should be incremented by 1 and loader should be set to true
        When The API responds successfully with new notary requests
        When The API response includes new and ongoing notary requests
        When Network responed for received request api
        Then ReceivedRequests state should be update
        Then Network responed for accept request review api
        Then Network responed for reject request review api

    Scenario: User navigates to RequestManagement and open filter popup
        Given I am a User loading RequestManagement
        When I navigate to the RequestManagement
        Then RequestManagement will load with out errors
        And User can select date from calendar
        And User can click on apply filter button
        And I can leave the screen with out errors
    Scenario: User views the empty state in RequestManagement
        Given I am a User loading RequestManagement
        When I navigate to RequestManagement with no rows and roleID 1
        Then The empty state should render with no requests message for roleID 1

        When I navigate to RequestManagement with no rows, roleID 2, and value not equal to 1
        Then The empty state should render with no notary request message for roleID 2
        When I navigate to RequestManagement with no rows, roleID 2, and value equal to 1
        Then The empty state should render with ongoing request message for roleID 2

    Scenario: User interacts with Draft status request
        Given I am a User loading RequestManagement
        When I navigate to the RequestManagement
        Then RequestManagement will load with draft requests
        When I view a request with DRAFT status
        Then Action box should show Delete option for draft request
        When notary request view button is clicked
        Then should call getNotaryRequestDetails on button click
        When I click on delete button for draft request
        Then Delete confirmation modal should open without cancellation charges
        When I confirm deletion of draft request
        Then Draft request should be removed and list should refresh
        Then Draft status specific display elements should be correct

    Scenario: Cover specific uncovered code paths in RequestManagement
        Given I am loading RequestManagement
        When I can change tabs for different user types
        Then Tab data should be correctly set for notary
        When I handle tab changes as end user
        Then Tab data should be correctly set for end user
        When I handle different request types
        When I set request modal for different types 
        When I check date colors for different scenarios
        When I check date colors for in progress request
        When I check date colors for draft request
        When I check date colors for invited request
        When I check different request statuses
        When I check accept/reject button visibility
        When I check status classes for all special statuses
        When I handle empty notary request response
        When I check invited section visibility for different users
        When I get status information for different scenarios
        When I reject an invited request