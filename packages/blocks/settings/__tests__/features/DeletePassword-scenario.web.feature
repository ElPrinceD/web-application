Feature: DeletePassword

    Scenario: User navigates to DeletePassword
        Given I am a User loading DeletePassword
        When I navigate to the DeletePassword
        Then DeletePassword will load without errors

    Scenario: Component mounts and receives API response
        Given I have mounted the DeletePassword component
        When The component mounts and API is called
        Then It should handle the API response correctly

    Scenario: User attempts to delete account
        Given I am on the DeletePassword screen
        When I enter my password and click delete
        Then It should validate the password and show confirmation
    
    Scenario: Display error message
        Given I am on the DeletePassword screen
        When There is an error in the state
        Then The error message should be displayed

    Scenario: Display success popup
        Given I am on the DeletePassword screen
        When The handleSuccessPopup state is true
        Then The success confirmation popup should be displayed

    Scenario: Display failure popup
        Given I am on the DeletePassword screen
        When The failurePopup state is true
        Then The failure confirmation popup should be displayed

    Scenario: Component mounts and handles API loading error
        Given I have a DeletePassword component
        When The component mounts and API loading fails
        Then It should handle the error and continue execution

    Scenario: Component receives profile API response
        Given I have a DeletePassword component
        When The component receives a profile API response
        Then It should update the email state

    Scenario: Component receives check password API response
        Given I have a DeletePassword component
        When The component receives a check password API response
        Then It should call saveLoggedInUserData

    Scenario: Component receives delete account API response
        Given I have a DeletePassword component
        When The component receives a delete account API response
        Then It should call deleteAccountProcess
    
    Scenario: Component handles invalid login response
        Given I have a DeletePassword component
        When The component receives an invalid login response
        Then It should set an error state

    Scenario: User closes delete confirmation popup
        Given I am on the DeletePassword screen with confirmation popup open
        When I click the delete button again
        Then The confirmation popup should close

    Scenario: User enters correct remembered password
        Given I am on the DeletePassword screen with remembered credentials
        When I enter the correct remembered password and click delete
        Then The confirmation popup should open

    Scenario: User submits empty password
        Given I am on the DeletePassword screen
        When I submit an empty password
        Then I should see an error message about empty password

    Scenario: Component handles successful account deletion
        Given I have a DeletePassword component
        When The component receives a successful delete account API response
        Then It should call handleSuccessFlow

    Scenario: Component handles failed account deletion
        Given I have a DeletePassword component
        When The component receives a failed delete account API response
        Then It should call handleErrorFlow

    Scenario: Component handles successful account deletion flow
        Given I have a DeletePassword component
        When The handleSuccessFlow is called with a success message
        Then It should show a success popup and then navigate to logout

    Scenario: Component handles failed account deletion flow
        Given I have a DeletePassword component
        When The handleErrorFlow is called with an error message
        Then It should show a failure popup and then hide it after a delay

    Scenario: Component handles logout navigation
        Given I have a DeletePassword component
        When The handleLogoutNavigation is called
        Then It should remove storage data, sign out from providers, and navigate to Home