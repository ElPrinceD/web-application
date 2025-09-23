Feature: cfzoomintegration92

    Scenario: User navigates to cfzoomintegration92 and inputs text
        Given I am a User loading cfzoomintegration92

        When The profile api is load
        Then Data will render on the screen
        
        When I click on zoom button
        Then Zoom meeting will be open

        Then If there are attendees, tab will not close

        When User clicks on back icon button
        Then The correct navigation method is called

        When I click on next open side bar button
        Then Data will be changed
               
        Then New Notary modal will open successfully