Feature: ForgotPassword

    Scenario: User navigates to ForgotPassword
        Given I am a User loading to ForgotPassword
        When I navigate to the ForgotPassword Screen
        Then ForgotPassword will load with out errors
        And Network api shoudl be called for getiing validation rules
        When Network response for validation rules is set
        Then Email schema is set
        When I can click on sms account button for forgot password with mobile number
        Then Forgot password with sms form should be render
        When I can enter phone number in text field
        Then handleChange function should be call for update value
        When I can submit the form with phone number without selected country code
        And I can see alert message for country code validation
        When Country code should be set from message
        When I select country code from select list
        When I can press on submit button
        When Submit function should be called
        Then Network should be called for getting otp
        When Network response should be get with errors
        When Network response should be get with success response data
        Then Token is set

    Scenario: User navigates to ForgotPassword with email id
        Given I am a User loading to ForgotPassword
        When I can click on email account button for forgot password with mobile number
        When Country code should be set from message
        And Forgot password with email form should be render
        And I can enter email id in text field
        And handleChange function should be call for update value
        When I can submit the form with email id
        Then Network should be called for getting otp for email
        When Network response should be get with error
        When Network response should be get with success response
        Then Token is set
        When Navigation payLoad message should be get
        When Forgot password with email form should be render
        When I can enter otp in text field
        Then handleChange function should be called
        When I can press submit button to submit otp
        Then Network api request should be call
