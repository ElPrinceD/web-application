Feature: ContactUs

    Scenario: User navigates to ContactUs
        Given I am a User loading ContactUs
        When I navigate to the ContactUs
        Then ContactUs page will load with out errors
        And Contact data will display and hide skeleton
        And contact page data display with clicks
        And I can leave the screen with out errors
