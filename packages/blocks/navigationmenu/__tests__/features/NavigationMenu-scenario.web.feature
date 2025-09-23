Feature: NavigationMenu

    Scenario: User navigates to NavigationMenu
        Given I am a User loading NavigationMenu
        When Notary user is logged in
        Then Notary user sees service section
        When End user is logged in
        Then End user sees service section
        When I can click on the logo
        Then redirect to the landing page
        When User click on the my account button
        Then User will be navigate to the my account page
        When User click on the dashboard button
        Then User will be navigate to the dashboard page
        When User click on the request button
        Then User will be navigate to the request page
        When User click on the catalogue button
        Then User will be navigate to the catalogue page
        When User click on the calender button
        Then User will be navigate to the calender page
        When User click on the logout button
        Then User will be navigate to the landing page
        Then User can click on menubar icon
        
    Scenario: Guest User Navigation and Authentication Flow
        Given I am a Guest User loading NavigationMenu
        When I check for token
        Then I should see default services without token
        When I try to access protected route
        Then I should see login popup
        When I click login button in popup
        Then I should navigate to login page
        When I click signup button in popup
        Then I should navigate to signup page
        When I click close button in popup
        Then Login popup should be closed
        Then Logut is not Showen

    Scenario: Navigation Menu Role-based Service Configuration
        Given I am a User loading NavigationMenu
        When User has role_id 1
        Then Services should be configured for role_id 1
        When User has role_id 2
        Then Services should be configured for role_id 2
        When Window location pathname is set
        Then Active tab should be set correctly
        When Role ID is neither 1 nor 2
        Then Default services should remain unchanged