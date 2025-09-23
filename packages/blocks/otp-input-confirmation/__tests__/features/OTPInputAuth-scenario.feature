Feature: OTPInputAuth

    Scenario: User navigates to OTPInputAuth
        Given I am a User loading OTPInputAuth
        When I navigate to the OTPInputAuth
        Then OTPInputAuth will load with out errors
        When Getting payload message from navigation adapter
        When I can press submit button without entering otp
        Then Alert message should be display
        When I am entering otp in otp text input
        When I click anywhere to hide keyboard view
        Then Otp state should be updated
        When I can press submit button to verfy otp
        Then Network should be send request for verify otp
        When Network response should be set for verify otp
        When I submit otp for forgot password
        When Network response should be set for verify otp
        Then Network should be send request for verify otp


    Scenario: User navigates to OTPInputAuth in web
        Given I am a User loading to OTPInputAuth
        Then OTPInputAuth will load with out errors
        When I can enter otp in otp text input field
        Then Text field is set
        When I can press submit button with wrong entered otp
        When Network response should be get with error message
        Then Network should be send request for verify otp