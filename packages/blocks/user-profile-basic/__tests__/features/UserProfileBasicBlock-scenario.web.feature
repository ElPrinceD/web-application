Feature: UserProfileBasicBlock

Scenario: User navigates to UserProfileBasicBlock
    Given I am a User loading UserProfileBasicBlock
    When I navigate to the UserProfileBasicBlock
    Then UserProfileBasicBlock will load with out errors

    When Country code api will call
    Then Country code api called succesfully

    When Country code list api will call
    Then Country list api called successfully

    When User click on the offline button
    Then User set there status online

    When I navigate to the UserProfileBasicBlock
    Then UserProfileBasicBlock will load with out errors

    When I get role id in UserProfileBasicBlock
    Then UserProfileBasicBlock user get id

   