Feature: ChangePassword

    Scenario: User navigates to ChangePassword
        Given I am a User loading ChangePassword
        When I navigate to the ChangePassword
        Then User can see the new password input field
        Then ChangePassword will load with out errors
        And I can enter different new and confirm password and click change password button
        And I can enter same new and confirm password and click change password button
        And User can see the first errors message in red color if validation is not passed
        And User can see the second errors message in red color if validation is not passed
        And User can see the third errors message in red color if validation is not passed
        And User can see the fourth error message in red color if validation is not passed
        And User can see the all errors message in red color no password is passed
        And I can leave the screen with out errors