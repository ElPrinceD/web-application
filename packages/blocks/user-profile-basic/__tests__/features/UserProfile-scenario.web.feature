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

    When User click on the my profile Button
    Then Profile page will open

    When User click on the edit profile button
    Then User can edit the input fields

    When User without enter the fullname
    Then Validation will check and give error

    When Edit profile will called again
    Then Edit API will again called sucessfully

    When I enter the profile name
    Then The profile name will be displayed on the screen

    When User without Enter the address
    Then Validation will check and give error

    When Edit profile will called
    Then Edit API will called sucessfully

    When I enter the primary address again
    Then The address will be displayed on the screen again

    When I enter the mobile number zero digit
    Then The mobile number will give error

    When I enter the valid mobile number
    Then The valid mobile number will be displayed on the screen

    When User enter the city name more then 30 character
    Then Validation will give error for city

    When Edit save button will called again
    Then Edit save will again called sucessfully

    When I enter the city
    Then The city will be displayed on the screen

    When User enter the post code more then 8 chracter
    Then Validation will trigger again and give error

    When Save button will called again
    Then Save will again called sucessfully

    When User click on the profile picture
    Then Profile will update successfully

    When I enter the profile email
    Then The profile email will be displayed on the screen

    When User click on the profile picture again
    Then Profile will give error

    When I enter the country code
    Then The country code will be displayed on the screen

    When I navigate to the UserProfileBasicBlock
    Then UserProfileBasicBlock will load with out errors

    When I enter the company name
    Then The company name will be displayed on the screen

    When I enter the mobile number
    Then The mobile number will be displayed on the screen

    When I enter the primary address
    Then The address will be displayed on the screen

    When I enter the secondary address
    Then The secondary address will be displayed on the screen

    When I enter the country
    Then The country will be displayed on the screen

    When I enter the post code
    Then The post code will be displayed on the screen

    When I edit the changes
    Then The editable fields are visible

    When User click on the save button after filling the details
    Then Edit api will call successfully

    When User click on the edit profile button again
    Then User can edit the input fields again

    When User click on the cancel button
    Then User details were removed

    When User click on the back arrow button
    Then User will be back without error
