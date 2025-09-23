Feature: Notifications

    Scenario: User navigates to Notifications
        Given I am a User loading Notifications
        When I navigate to the Notifications
        Then Notifications will load with out errors

        When no notifications are present
        Then notificationsBox will be shown

        When get notifications api will be called
        Then notifications will be fetched
        
        When user clicks on notification icon
        Then Notifications will open

        When user clicks on one notification
        Then notification is marked as read and notifications are fetched

        When user clicks on mark all as read
        Then notifications are marked as read and notifications are fetched