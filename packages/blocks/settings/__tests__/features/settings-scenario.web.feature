Feature: settings

    Scenario: Notary User navigates to settings
        Given I am a User loading settings
        When I navigate to the settings
        Then settings will load with out errors
        And I can enter text with out errors
        And I can leave the screen with out errors
        And I can select any tab
        And I can select the Connect button without errors

    Scenario: EndUser navigates to settings
        Given I am a User loading settings
        When I navigate to the settings
        Then settings will load with out errors
        And I can leave the screen with out errors

    Scenario: Notary User navigates to settings after account connect
        Given I am a User loading settings
        When I navigate to the settings
        Then settings will load with out errors
        And I can leave the screen with out errors

    Scenario: Notary User disconnects Stripe account
        Given I am a Notary User with a connected Stripe account
        When I navigate to the settings
        And I click on the Disconnect button
        Then the disconnect button toggles the popup
        Then I should see a confirmation popup
        When I confirm the disconnection
        Then I should see a success popup
        And the Stripe account should be disconnected

    Scenario: Notary User fails to disconnect Stripe account
        Given I am a Notary User with a connected Stripe account
        When I navigate to the settings
        And I click on the Disconnect button
        Then I should see a confirmation popup
        When I confirm the disconnection
        And the disconnection fails
        Then I should see a failure popup

    Scenario: Notary User redirected to Setting page
        Given I am redirected to the Setting
        When I Redirect to the Setting
    