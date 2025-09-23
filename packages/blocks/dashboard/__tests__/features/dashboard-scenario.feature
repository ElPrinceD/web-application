Feature: dashboard

    Scenario: User navigates to dashboard
        Given I am a User loading dashboard
        When I navigate to the dashboard
        Then dashboard will load with out errors
        And Dashboard will display data if API success
        And Render flatlist without errors
        And Dashboard will display notifcation if API failure
        And I can leave the screen with out errors