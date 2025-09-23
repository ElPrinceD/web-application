Feature: NewNotaryReq

    Scenario: User navigates to NewNotaryReq
        Given I am a User loading NewNotaryReq
        When I navigate to the NewNotaryReq
        Then newNotaryReq will load with out errors
        When I can click the Next button
        Then I redirected to next step
        When I click on datepicker
        Then Date calender will open without error
        When DatePicker will close
        Then Date calender will close without error
        When I can click the Cancel button
        Then I redirected to previous step
        And I can leave the screen with out errors