Feature: VideoSdk

    Scenario: User navigates to VideoSdk
        Given I am a User loading VideoSdk

        When The apis are called
        Then Data will be rendered on the screen

        When Notary user logs in
        Then Invite client button is rendered

        When End user logs in
        Then Book Now button is rendered

        When User clicks on book now request modal
        Then Book Now modal should open

        When User clicks on hamburger menu icon
        Then sidebar is toggled

        When User clicks on back icon button
        Then Page will unmount