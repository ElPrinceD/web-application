Feature: CatalogueNotary

    Scenario: User navigates to CatelogueNotary
        Given I am a User loading CatelogueNotary
        When I navigate to the CatelogueNotary
        Then CatelogueNotary will load with out errors
        When I can filterData from api
        Then I can filterData when select 
        When I can filterData select from api
        Then I can see filterData when select 
        When I can scroll the main section
        Then I can see latest notary data
        When I can click button to open sidebar
        Then I should remove the scroll event listener on unmount
       
