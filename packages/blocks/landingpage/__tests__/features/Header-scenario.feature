Feature: Header

    Scenario: User navigates to Header
        Given I am a User loading Header
        When I navigate to the Header
        Then Header will load with out errors
        When I click on toggle button
        Then Drawer should open
        And I can click the home button
        And I am navigated to the home page
        And I can click the services button
        And I can click the aboutus button
        And I can click on contact menu from the header
        And I can click faq menu from the header
        And I can leave the screen with out errors

    Scenario: User navigates to Header Upright side
        Given I am a User loading Header Upright side
        When I navigate to the Header Upright side
        Then Header will load with out errors on Upright side
        When I click on username toggle button
        Then User can review the dashboard menu

