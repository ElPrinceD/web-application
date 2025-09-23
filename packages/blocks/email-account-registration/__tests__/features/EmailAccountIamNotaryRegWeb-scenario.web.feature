Feature: EmailAccountIamNotaryRegWeb
    Scenario: Register Email Account
        Given I am a User Creating New Account
        When I navigate to the Registration Screen
        Then Email account registration screen will load country API without error
        Then Footer is visible

        When User tries to enter characters that are not allowed in full name
        Then These not allowed characters will not be entered in full name

        When User tries to enter characters that are not allowed in business name
        Then These not allowed characters will not be entered in business name

        When I enter a first and last name with out errors
        Then First and last name will save without errors
        And I can enter a email with out errors
        And I can enter a password with out errors
        And I can enter company name with out errors
        And I can toggle the Password Show/Hide with out errors
        And I can enter a confimation password with out errors
        And I can toggle the Confimation Password Show/Hide with out errors
        When I click country field without error
        Then Country list shown in list without error
        When I click on SignUp button without error
        Then Validation will check on all input data and send to server without error
        And I can leave the screen with out errors

    Scenario: Empty First Name
        Given I am a User attempting to Register with a Email
        When I Register with an empty First Name
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Invalid Email
        Given I am a User attempting to Register with a Email
        When I Register with an Invalid Email
        Then Registration Should Fail
        And RestAPI will return an error

    Scenario: Password and RePassword do not match
        Given I am a User attempting to Register with a Email
        When I Register with Password and RePassword that do not match
        Then Registration Should Fail
        And RestAPI will return an error
        When Enter wrong password validation
        Then Validation should failed
        When Enter wrong confirm password validation
        Then Validation should failed

    Scenario: Valid Registration
        Given I am a User attempting to Register with a Email
        When I Register with all valid data
        Then Registration Should Succeed
        And RestAPI will return token
        When User navigates to different pages
        Then Pages will render
        When User click on Notary Logo
        Then Pages will render
        When User click on Home Logo
        Then Pages will render
        When User click on Landing Logo
        Then Pages will render
    
    Scenario: Redirection of back
        Given I am a User Creating New Account
        When I navigate to the Registration Screen
        Then handleRedirectCheck should set state when signupData exists
        Then handleRedirectCheck should not set state when signupData doesn't exist

    Scenario: User navigated by back redirection
        Given I am a User Creating New Account
        When The component mounts
        Then handleRedirectCheck should be called
    
    Scenario: Submit Registration Form with Valid Data
        Given I am a User Creating New Account with valid data
        When I submit the registration form
        Then The form should be submitted successfully

     Scenario: User navigate to registration page for checkbox select change
        Given I am a User loading email account registration page
        When I change checkbox for privacy
        Then checkbox change successfully
