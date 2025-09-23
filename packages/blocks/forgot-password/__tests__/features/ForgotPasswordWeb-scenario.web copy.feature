Feature: ForgotPasswordWeb

    Scenario: Enter Email Account
        Given I am a User attempting to Enter email
        When I navigate to the Forgot Password Screen
        When I enter email address
        Then I call api on email
        When I enter invalid email address
        Then I call api on email invalid
     