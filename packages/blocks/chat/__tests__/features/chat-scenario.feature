Feature: Chat

  Scenario: User navigates to Chat
    Given I am a User loading Chat
    When I navigate to Chat
    Then Chat will load

    And a call to retrieve the chatlist will be made
    And I will see a list of chatrooms I am a part of

    When I press on the createChatRoom button
    When I press on the cancel button
    
    When I press on the createChatRoom button
    Then I can enter the chat room name
    When I can hide keyboard
    When I press on the createChatRoom button
    Then a call to create the chat room will be made
    When the network will respond with a success
    Then a call to retrieve the chatlist will be made
    When I will see a list of chatrooms I am a part of
    When I press on a chat room
    And I can leave the screen