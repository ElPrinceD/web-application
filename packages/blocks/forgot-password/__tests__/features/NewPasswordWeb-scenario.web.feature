Feature: NewPasswordWeb

    Scenario: Enter New Password
        Given I am a User attempting to Enter New Password
        When I navigate to the New Password Screen
        Then I enter Password
        Then I enter confirm password
        Then I handle failed API call and show error result
        Then I call api again on email
        When User click on Login Button
        Then User Navigate to Next Screen without errors
        When User clicks on go to dashboard button
        Then User gets navigated to dashboard page