Feature: InviteForm

    Scenario: User sees InviteForm
        Given I am a User loading InviteForm
        When I see the InviteForm
        Then InviteForm will load with out errors

        When getPriorityApi is called and doesn't receive a response within 30 seconds
        Then it should set initial priorities

        When Send invite button is clicked
        Then Form shows errors

        When client name is entered
        Then client name is filled

        When email is entered
        Then email is filled

        When country code is entered
        Then country code is filled

        When mobile number is entered
        Then mobile number is filled

        When service type is entered
        Then service type is filled

        When notarisation method is entered
        Then notarisation method is filled

        When fees is entered
        Then fees is filled

        When VAT is checked
        Then VAT gets checked

        When calendar field is clicked
        Then calendar opens

        When User click on the calendar button
        Then calendar will get open with no selected date

        When User click on the cancel button
        Then Calendar modal will closed

        When User click again on the calendar button
        Then calendar will get open again with no selected date

        When User press the left arrow button
        Then Month get changed

        When User press the right arrow button
        Then Month get updated

        When User select the time period
        Then Time period will selected

        When User select the time period
        Then Time period will selected

        When User select the date
        Then Date get selected

        When User select the time period
        Then Time period will selected

        When User click on the save button
        Then Calendar get closed

        When video call is checked
        Then video call gets checked

        When notes are entered
        Then notes are filled

    Scenario: User navigates through the InviteForm flow
        Given I am a User loading InviteForm
        When Component mounts and initial APIs are called
        Then Initial data should be loaded correctly

        When User submits form without selecting date and session
        Then Form should not proceed with submission

        When User submits form with complete data
        Then Form should submit successfully and reset

        When User submits form and API request fails
        Then Form should handle API error correctly

        When Form submits successfully and resets
        Then Form should reset all fields

        When getDateRangeFromMonth is called with current month
        Then it should return correct date range for current month

        When getDateRangeFromMonth is called with future month
        Then it should return correct date range for future month

        When Form validation is tested with various time inputs
        Then Time validation should work correctly

        When getTimeErrorMessage is called with different error combinations
        Then it should return appropriate error messages

        When findTimeValue is called with different time inputs
        Then it should format times correctly

        When Country code functions are tested
        Then Country code functions should work correctly

    Scenario: should call setState with loader true when isOpen prop changes from false to true
        Given isOpen prop changes from false to true
        When Simulate the component receiving new props
        Then Check that setState was called with the correct loader value
        Then After timeout, loader should be false

    Scenario: should not change loader state if isOpen does not change
        Given isOpen does not change
        When Simulate no change in props
        Then Check if loader state is the same (no state change)

    Scenario: should not set loader to true when isOpen is false and remains false
        Given isOpen is false and remains false
        When Simulate the component receiving the same false value for isOpen
        Then Loader state should remain false

    Scenario: Testing response handling and navigation
        Given I am a User loading InviteForm
        When API returns an error response
        Then Failure modal should show and hide after timeout

        When User clicks navigate to dashboard
        Then Navigation and state should update correctly

    Scenario: Testing country code related functions
        Given I am a User loading InviteForm
        When Country codes are loaded
        Then getCountryOptions should return formatted codes

        When getPlusOptionLabel is called with different inputs
        Then getPlusOptionLabel should handle all cases correctly

        When User cancel or close form
        Then form should be closed with reseting error

    Scenario: Testing fees validation logic
        Given I am a User loading InviteForm
        When validateFees is called with empty fees
        Then Validation should show required error
        When validateFees is called with VAT disabled
        Then Validation should not show error
        When validateFees is called with invalid number
        Then Validation should show invalid amount error
        When validateFees is called with valid service and method
        Then Validation should process VAT correctly
        When validateFees is called with amount less than VAT fee
        Then Validation should show VAT fee exceeds error

    Scenario: Testing form interactions and checkbox handling
        Given I am a User loading InviteForm
        When Form is submitted with fees error
        Then Fees error should be cleared and form reset
        When Checked VAT is clicked
        Then VAT should be unchecked
        When Checked video call is clicked
        Then Video call should be unchecked and errors cleared
        When Notarisation method changes to non-video type
        Then Video call should be automatically unchecked

     Scenario: Testing form submission and notarisation method handling
        Given I am a User loading InviteForm        
        When Form is submitted with fees error
        Then Form submission should be prevented and not proceed with API call
        When Notarisation method is changed
        Then Video call should be handled appropriately

    Scenario: Testing client request API response handling
        Given I am a User loading InviteForm
        When Client request API returns success
        Then Success modal should be shown        
        When Client request API returns error
        Then Failure modal should be shown        
        When setPlateFormFees is called with valid response
        Then VAT should be updated in state       
        Then it should complete the test successfully