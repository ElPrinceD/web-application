Feature: MiniHeader

    Scenario: User sees MiniHeader
        Given I am a User loading MiniHeader
        When I see the MiniHeader
        Then MiniHeader will load with out errors

        When Apis get called
        Then User details are shown on the screen

        When Book Now button will press
        Then New Notary modal will open successfully

        When Create request api will call
        Then Create request api get called

    Scenario: Notary User sees MiniHeader
        Given I am a notary User loading MiniHeader
        When I see the MiniHeader
        Then MiniHeader will load with out errors

        When Apis get called
        Then User details are shown on the screen

        When Notary user clicks on invite client button
        Then Invite Client Modal does not open

        When User clicks on profile box
        Then Navigation to user profile should be triggered

       Scenario: User navigates to dashboard min header with  user service data
        Given I am a User loading dashboard min header user service api
        When I call user service api
        Then user service api call successfully