Feature: Chat

  Scenario: User navigates to Chat
    Given I am a User loading Chat
    When I navigate to Chat
    Then Chat will load
    Then Chat User profile should visible on top of chat window
    And Should blur the input when clicked outside the input field
    When User enter text and click on send button
    Then Should focus the input when clicked inside the input field
    And Should scroll to the bottom of the message container
    And I can leave the screen