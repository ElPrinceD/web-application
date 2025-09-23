Feature: DocusignIntegration

    Scenario: User navigates to DocusignIntegration
        Given I am a User loading DocusignIntegration
        When I navigate to the DocusignIntegration
        Then Document will load with out errors

        When Notary user logs in
        Then Invite client button is rendered

        When End user logs in
        Then Book Now button is rendered

        When User clicks on book now request modal
        Then Book Now modal should open