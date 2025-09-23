Feature: EmailAccountRegistrationWeb

    Scenario: Register Email Account
        Given I am a User attempting to Register after confirming OTP
        Then EmailAccountRegistrationWeb will load with out errors
        Then Footer is visible
        When Going back to landing page
        Then It will navigate to Landing page
        When Going back to onboarding page
        Then It will navigate to onboarding page
        When I navigate to the Registration Screen
        When I click the Guest buttons
        Then Guest alert message will show
        Then I can enter a first name with out errors
        Then I can click the buttons
        Then I click on INDIVIDUAL buttons
        Then I call api
        When I enter fullname with empty data
        Then I call api on fullname
        When I enter fullname with data
        Then I call api on fullname with data
        When I enter email address
        Then I call api on email
        When I enter invalid email address
        Then I call api on email invalid
        When I enter email address second
        Then I call api on email second
        When I enter reEnter password re
        Then I call api on reEnter password re
        When I enter reEnter password
        Then I call api on reEnter password
        When I enter reEnter password second
        Then I call api on reEnter password second
        Then I can toggle the Password Show/Hide with out errors
        Then I enter login button
        Then I Click GotoHome button
        Then I Click on Business ToggleButton
        When I enter company name without errors
        Then company name will save without error
        When Enter wrong password validation
        Then Validation should failed
        When Enter wrong confirm password validation
        Then Validation should failed  
        And I can toggle the Password Show/Hide with out errors
        When I click submit button for registration without any errors
        Then Validation will check on all input data and send to server without error

    Scenario: Handle redirect check
        Given I am a User attempting to Register after confirming OTP
        When I load the EmailAccountRegistrationWeb component
        Then handleRedirectCheck should process stored signup data

    Scenario: User navigate to registration  for both page for checkbox select change
        Given I am a User loading email account registration page for both
        When I change checkbox for privacy policy and terms and condition
        Then checkbox change successfully