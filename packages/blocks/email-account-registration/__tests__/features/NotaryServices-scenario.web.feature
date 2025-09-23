Feature:NotaryServices

Scenario: User add Notary Services
  Given User navigate to NotaryServices screen
  Then NotaryServices will load with api call with out errors
  Then Everyone can review the footer part
  Then Top of NotaryServices page will open
  When Going back to landing page
  Then It will navigate to Landing page
  When User click on back arrow
  Then It will navigate to previous page
  When User select services from list without error
  Then Selected service add into a elementArray
  When User clicks on the continue button
  Then selected services will send to server without errors
  When User unselect services from list without error
  Then Selected services remove from a elementArray
  When User recieve error API response
  Then User can see the error message
  And User Navigate to Next Screen without errors
  When User click skip button without errors
  Then User can review the account verification modal
  Then User Navigate to Next Screen without errors 
  When NotaryServices will load api with empty service data
  Then No service data will available
  When NotaryServices will load api with error
  Then Error response will show

Scenario: should return true if window.innerWidth <= 767
Scenario: should return false if window.innerWidth > 767
Scenario: should return false if window is undefined