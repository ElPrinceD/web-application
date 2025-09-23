Feature: Email Address Account Log In

    Scenario: User navigates to Email Log In
        Given I am a User attempting to Log In with a Email
        When I navigate to the Log In Screen
        Then Login Screen will load without errors
        Then Footer is visible
        When I can toggle the Remember Me with out errors
        Then Toggle button will show on
        When I click on continue as guest button without error
        Then Alert message will for coming soon
        And I can select the Log In button with out errors
        And I can select the Forgot Password button with out errors
        And I can enter a email address with out errors
        And I can enter a password with out errors
        And I can leave the screen with out errors
        When I click on drawer toggle button
        Then Drawer should open

    Scenario: Empty Email Address
        Given I am a User attempting to Log In with a Email Address
        When I Log In with an empty Email Address
        Then Log In Should Fail
        Then Account not found
        Then User get the role

    Scenario: Email Address and Empty Password
        Given I am a User attempting to Log In with a Email Address
        When I Log In with a Email Address and empty Password
        Then Log In Should Fail

    Scenario: Password and Empty Email Address  
        Given I am a User attempting to Log In with a Email Address
        When I Log In with a Password and empty Email Address
        Then Log In Should Fail

    
    Scenario: Email Address and Password
        Given I am a Registed User attempting to Log In with a Email Address
        When I Log In with Email Address and Password
        Then Log In Should Succeed
        And RestAPI will return token

    Scenario: Remember Me - Email Address Account Log In 
        Given I am a Registed User who has already Logged In and selected Remember Me
        When I navigate to Email Address Account Log In
        Then The Country Code, Email Address and Password will be restored
        When Remember me is not selected and doing login with email and password
        Then Api will call for login without remember Me selected
        Then I Click On Goto Button
        Then I Click On Email Button

    Scenario: User navigates to Email Log In for role id
        Given I am a User loading Email Log In
        When User has role_id 1
        Then role is set successfully