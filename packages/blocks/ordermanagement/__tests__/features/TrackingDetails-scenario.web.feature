Feature: TrackingDetails

    Scenario: User navigates to TrackingDetails
        Given I am a User loading TrackingDetails
        When I navigate to the TrackingDetails
        Then TrackingDetails will load with out errors

        When User clicks on add tracking details button
        Then Add tracking details modal will open

        When User clicks on cancel button
        Then Add tracking details modal will close

        When User clicks on add tracking details button
        Then Add tracking details modal will open

        When User adds shipment provider name
        Then shipment provider name is entered

        When User leaves tracking number empty
        Then tracking number is empty

        When User adds tracking number
        Then tracking number is entered

        When User adds additional note
        Then additional note is entered

        When User clicks on submit button
        Then Tracking details are submitted

        When User clicks on close icon
        Then Success modal closes

        When user clicks on edit button
        Then edit form opens

        When User edits shipment provider name
        Then shipment provider name is entered

        When User edits tracking number
        Then tracking number is entered

        When User edits additional note
        Then additional note is entered

        When User clicks on submit button
        Then Tracking details are updated

        When User clicks on close icon
        Then Success modal closes
        Then User sees the tracking number

        When User clicks on add more button
        Then add tracking details modal opens

        When User clicks on close icon
        Then Success modal closes

        When User expands the accordion
        Then Accordion is expanded