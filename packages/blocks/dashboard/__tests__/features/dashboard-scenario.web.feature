Feature: Dashboard

    Scenario: User navigates to Dashboard
        Given I am a User loading Dashboard
        When I navigate to the Dashboard
        Then Dashboard will load with out errors

        When User comes to the dashboard
        Then Token get saved

        When User Profile api get called
        Then User Detail get show on the screen

        When AllRequest show api get called with error
        Then dashboard will show empty record structure

        When User clicks on the book now button
        Then User will see the correct modal based on user type


        When AllRequest show api get called
        Then AllRequest will show on the dashboard

        When Count of allRequest api get called
        Then Count of allRequest will show on the requests box

        When Services api get called
        Then ServiceData will show on the notary services section

        When I click on next paggination button
        Then Data will be changed

        When I click on previous paggination button
        Then Data will be changed

        Then Data will be changed

        When User click on three Dots button
        Then View Modal will call successfully

        When notary request view button is clicked
        Then should call getNotaryRequestDetails on button click
        When notary request view button is clicked
        Then should call getNotaryRequestDetails on button click
        When The zoom meeting button click
        Then The zoom meeting api will called

        When user clicks on cancel request for non cancellable request
        Then popup should open

        When Clicked on cancel button for non-cancellable request
        Then Failure modal is shown

        When User clicks on failure modal button
        Then failure modal closes

        When Cancel request button is clicked
        Then Cancel Request Modal should open

        When Notary user login and come to dashboard
        Then Get Profile API will call successfully

        When AllRequest show api get called again while logging on notary user credentials
        Then AllRequest will show on the dashboard for notary user

        When AllRequest API Changes
        Then AllRequest will show

        When User clicks on the book now button
        Then User will navigate to the profile page

        When User click on add notary service button
        Then User will navigate to the notary service page

        When AllRequest show api get called again while logging on notary user
        Then Request will show on the dashboard for notary user

        When User login and come to dashboard again with notary user
        Then Get Profile API will call successfully for notary user

        When Notary user click on the ongoing Request
        Then Ongoing request will be selected

        When User clicks on yes button of cancel request modal
        Then handleYesButtonClick should be called

        When User clicks on no button of cancel request modal
        Then handleNoButtonClick should be called
        
    Scenario: Notary User navigates to Dashboard after login
        Given I am a User loading Dashboard
        When I navigate to the Dashboard
        Then Dashboard will load with out errors

        When Complete Profile API will be called
        Then Complete profile box will be rendered
        Then New request and ongoing request toggle buttons will not be visible
        
        When User clicks on add qualified signature
        Then user is redirected to settings
        
        When User clicks on add VAT details
        Then user is redirected to settings
        
        When User clicks on add payments
        Then user is redirected to settings

        When Complete profile API is called
        Then Complete profile box will not be rendered
        Then New request and ongoing request toggle button is visible on screen

    Scenario: User interacts with Draft status request
        Given I am a User loading Dashboard
        When I navigate to the Dashboard
        Then Dashboard will load with draft requests

        When I view a request with DRAFT status
        Then Action box should show Delete option for draft request

        When I click on delete button for draft request
        Then Delete confirmation modal should open without cancellation charges

        When I confirm deletion of draft request
        Then Draft request should be removed and list should refresh
        Then Draft status specific display elements should be correct

    Scenario: End user interacts with notary invites
        Given I am a User loading Dashboard
        When I load the dashboard as an end user
        Then Dashboard should load with invite data

        When I switch to the invites tab
        Then I should see my pending invites
        
        When I click the action menu for an invite
        Then I should see accept and reject options

        When I click the view button
        Then I should navigate to request detail
        
        When I click the accept button
        Then The invite acceptance modal should open

        When I handle various modal interactions
        Then Modal states should update correctly
        
        When I click the reject button
        Then Rejection flow should start
        
        When I confirm rejection with success
        Then Success message should be shown
        
        When I try rejection with failure
        Then Error message should be shown
        
        When I switch to notary user
        Then Notary specific states should be set

        When I switch to invites tab as notary
        Then Notary invite view should be correct

        When I create a new request
        Then New request modal should open

        When I handle an invite request
        Then Invite request modal should open

        When I close all modals
        Then All modals should be closed
        Then Dashboard loads without any issue