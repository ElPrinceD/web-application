Feature: UserNotaryService

    Scenario: User navigates to UserNotaryService
        Given I am a User loading UserNotaryService
        When User comes to the UserNotaryService
        Then Token get saved

        When I navigate to the UserNotaryService
        Then UserNotaryService will load with out errors

        When User get service api will called
        Then Service API will called successful

        When User click on the back button
        Then User will go back from notary service screen

        When User click on the all select service button
        Then Users all services will be selected

        When User click on the all unselect service button
        Then Users all services will be unSelected

        When User click on the particular service block
        Then Service block will be selected

        When User click on the particular service block again
        Then Service block will be un selected

        When User click on the save button
        Then Add services api will be called

        When Add service api will called
        Then Services api will called successfuly

        When User click on the cancel button
        Then User will be go back to the my account

        When User click on the yes button in the modal
        Then user notary service add api will called

        When Add service api will called again
        Then Services api will called successfuly again