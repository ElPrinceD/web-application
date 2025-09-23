Feature:OtpVerification

Scenario: User verifies OTP
  Given User navigate to OtpVerification screen
  Then OtpVerification will load with out errors
  When User enters valid OTP without errors
  Then OTP inputs will saved without errors
  When User clicks on the Verify OTP button
  Then Verify Otp API will call without errors
  When I press Verify button without entering otp
  Then Alert message should be display
  When User click on resend OTP button
  Then Resend otp api will call without error
  Then User Navigate to Next Screen without errors
