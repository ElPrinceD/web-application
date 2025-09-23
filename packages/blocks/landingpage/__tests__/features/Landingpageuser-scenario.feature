Feature: LandingPageUser

  Scenario: User navigates to LandingPageuser
    Given I am a User loading LandingPageuser
    When Guest user will redirect to the main landing page
    Then LandingPageuser will load without errors
    When CountUp should render and animate to the correct number
    Then The surrounding Typography elements should render correctly
    When I can click on next button from the landing page
    Then Image will slide to next
    When I click on previous button
    Then Image will slide to previous
    Then I can leave the screen without errors

    Scenario: User navigates to LandingPageuser news letter on change
        Given I am a User loading LandingPageuser for change
        When I navigate to the LandingPageuser for news letter
        Then news letter email change successfully
        When I navigate to the LandingPageuser for news letter invalid email
        Then getting error invalid email
        When I navigate to the LandingPageuser for news letter email field blank
        Then getting error email field blank
        When I navigate to the LandingPageuser for news letter subscribe
        Then news letter subscribe successfully
        When I navigate to the LandingPageuser for news letter subscribe api call for error
        Then error render on the screen
        When I navigate to the LandingPageuser for success modal
        Then success button click successfully
