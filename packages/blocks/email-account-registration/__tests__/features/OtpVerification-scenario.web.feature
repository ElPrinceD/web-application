Feature:OtpVerification

Scenario: User verifies OTP
  Given User navigate to OtpVerification screen
  When User navigate to Otp Screen
  Then OtpVerification will load with out errors
  Then Footer is visible
  Then Top of OtpVerification will open
  When User going to click on back aerrow button
  Then It will navigate to previous page
  When user click on Home Logo
  Then It will navigate to Landing page
  When User enters valid OTP without errors
  Then OTP inputs will saved without errors
  When User clicks on the Verify OTP button
  Then Verify Otp API will call without errors
  When I press Verify button without entering otp
  Then Alert message should be display
  When User click on resend button for new OTP
  Then Resend otp api will call without error
  When User click on GotoDashboard Button
  Then User will receive popup after click on signup button
  Then User Navigate to Next Screen without errors
