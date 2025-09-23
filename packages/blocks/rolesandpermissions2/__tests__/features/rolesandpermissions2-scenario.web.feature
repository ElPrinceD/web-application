Feature: rolesandpermissions2

    Scenario: User navigates to rolesandpermissions2 and inputs text
        Given I am a User loading rolesandpermissions2
        When I navigate to the rolesandpermissions2
        Then rolesandpermissions2 will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors

    Scenario: User navigates to rolesandpermissions2 and inputs a password
        Given I am a User loading rolesandpermissions2
        When I navigate to the rolesandpermissions2
        And I want to enter a password
        Then rolesandpermissions2 will load with out errors
        And the text input field will be a password field
        And I can enter text with out errors
        And I can toggle to show the password
        And I can select the button with with out errors
        And I can leave the screen with out errors