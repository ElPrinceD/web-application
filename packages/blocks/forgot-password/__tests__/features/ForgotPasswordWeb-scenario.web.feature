Feature: ForgotPasswordWeb

    Scenario: Enter Email Account
        Given I am a User attempting to Enter email
        When I navigate to the Forgot Password Screen
        When I click on back arrow
        Then It will navigate back to previous screen 
        When I enter email address
        When I enter blank email address
        Then I call api on email
        When I enter invalid email address
        Then I call api on email invalid
        When User click on Login Button
        Then User Navigate to Next Screen without errors

    Scenario: componentDidMount sets email from localStorage
        Given Local storage has a saved email
        When I render the ForgotPasswordWeb component
        When The component should load the saved email into the state

    
     