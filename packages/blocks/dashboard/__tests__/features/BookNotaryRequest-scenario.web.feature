Feature: BookNotaryRequest

    Scenario: User navigates to BookNotaryRequest
        Given I am a User loading BookNotaryRequest
        When I navigate to the BookNotaryRequest
        Then BookNotaryRequest will load with out errors

        When Notarisation api get called
        Then Notarisation method will call successfully

        When Juridicition api get called
        Then Juridicition will call successfully

        When Priority api get called        

        When getPriorityApi is called and doesn't receive a response within 30 seconds
        Then it should set initial priorities

        When getDateRangeFromMonth is called with the current month
        Then it should return the correct date range

        When getDateRangeFromMonth is called with a future month
        Then it should return the correct date range for the future month

        When setInitialPriorities is called for a specific month
        Then it should set correct priorities for the month

        When User select the service selection
        Then Service get selected

        When User select the notarisation method
        Then Notarization get selected

        When User select the juridiction
        Then juridiction get selected

        When User type something on the notes
        Then Notes will get stored

        When User click on the calender button
        Then Calender will get open with no selected date

        When User click on the cancel button
        Then Calendar modal will closed

        When User click again on the calender button
        Then Calender will get open again with no selected date

        When User press the left arrow button
        Then Month get changed

        When User press the right arrow button
        Then Month get updated

        When User select the time period
        Then Time period will selected

        When User select the time period
        Then Time period will selected

        When User select the date
        Then Date get selected

        When User select the time period
        Then Time period will selected

        When User click on the save button
        Then Calendar get closed

        When User click on increment button of notarised
        Then Notarised value get increased 

        When User click on increment button of notarised agin
        Then Notarised value get increased again

        When User click on decrement button of notarised
        Then Notarised value get decreased

        When User click on number of document notarised button
        Then Number of documents will show on the filed

        When User click on next button
        Then Notary document upload modal get open

        When User clicks on back button
        Then prevStep should be called

        When User click on next button
        Then Notary document upload modal get open


        When User upload a file
        Then File get uploaded successfully
        
        When User upload the files more then 2mb for handle files
        Then Validation will show for uploading files

        When User click on add Document Button
        Then Document object will be added to the files

        When User Drag file into the add button
        Then files will be dragged

        When User drop the files in the upload field
        Then files will be dropped

        When User drop the files more then 2mb
        Then Validation will show while dropping

        When User click on next button without clicking on checkbox
        Then User will show error

        When User check the terms and condition for file
        Then Check field will be checked

        When User check the notry condition for file
        Then Check field will be checked

        When User clicks on remove button
        Then Document will be removed

        When User click on next button
        Then Add recipients modal get open

        When User fil the recipient name
        Then User get the name of the receipients

        When User click on create button without adding receipeint email
        Then Error will shown on email input and signatory checkbox
        Then signatory error text should be visible

        When User fil the recipient email
        Then User get the email of the receipients

        When User click on the also a signatory button
        Then Signatory button check is checked

        When User enter the recipients name
        Then Recipients name will be added

        When Signatory change function will called
        Then Signatory will true and added to the files

        When User click on the add receipients button
        Then receipents from files are added

        When User click on the remove receipients button
        Then receipents from files are removed

        When User click on up arrow button
        Then Recipients will be hide on the step 3

        When Receipients Invalid email id will be added
        Then Receipients email validation will check

        When User click on create request button
        Then Create notary request api will called

        When Create request api will call
        Then Create request api get called

        When User click on the close button
        Then Success modal will close
        
        When User click on the yes button
        Then Modal will close

        When User click on save close modal button
        Then Save modal will close successfully           

    Scenario: User navigates to BookNotaryRequest for edit
        Given I am a User loading BookNotaryRequest
        When I navigate to the BookNotaryRequest to edit request
        Then BookNotaryRequest will load with out errors.        

        When Notarisation api get called
        Then Notarisation method will call successfully

        When Juridicition api get called
        Then Juridicition will call successfully

        When Priority api get called        

        When getPriorityApi is called and doesn't receive a response within 30 seconds
        Then it should set initial priorities

        When getDateRangeFromMonth is called with the current month
        Then it should return the correct date range

        When getDateRangeFromMonth is called with a future month
        Then it should return the correct date range for the future month

        When setInitialPriorities is called for a specific month
        Then it should set correct priorities for the month

        When User select the service selection
        Then Service get selected

        When User select the notarisation method
        Then Notarization get selected

        When User select the juridiction
        Then juridiction get selected

        When User type something on the notes
        Then Notes will get stored

        When User click on the calender button
        Then Calender will get open with no selected date

        When User click on the cancel button
        Then Calendar modal will closed

        When User click again on the calender button
        Then Calender will get open again with no selected date

        When User press the left arrow button
        Then Month get changed

        When User press the right arrow button
        Then Month get updated

        When User select the time period
        Then Time period will selected

        When User select the time period
        Then Time period will selected

        When User select the date
        Then Date get selected

        When User select the time period
        Then Time period will selected

        When User click on the save button
        Then Calendar get closed

        When User click on increment button of notarised
        Then Notarised value get increased 

        When User click on increment button of notarised agin
        Then Notarised value get increased again

        When User click on decrement button of notarised
        Then Notarised value get decreased

        When User click on number of document notarised button
        Then Number of documents will show on the filed

        When User click on next button
        Then Notary document upload modal get open

        When User clicks on back button
        Then prevStep should be called

        When User click on next button
        Then Notary document upload modal get open


        When User upload a file
        Then File get uploaded successfully
        
        When User upload the files more then 2mb for handle files
        Then Validation will show for uploading files

        When User click on add Document Button
        Then Document object will be added to the files

        When User Drag file into the add button
        Then files will be dragged

        When User drop the files in the upload field
        Then files will be dropped

        When User drop the files more then 2mb
        Then Validation will show while dropping

        When User click on next button without clicking on checkbox
        Then User will show error

        When User check the terms and condition for file
        Then Check field will be checked

        When User check the notry condition for file
        Then Check field will be checked

        When User clicks on remove button
        Then Document will be removed

        When User click on next button
        Then Add recipients modal get open

        When User fil the recipient name
        Then User get the name of the receipients

        When User click on create button without adding receipeint email
        Then Error will shown on email input and signatory checkbox
        Then signatory error text should be visible

        When User fil the recipient email
        Then User get the email of the receipients

        When User click on the also a signatory button
        Then Signatory button check is checked

        When User enter the recipients name
        Then Recipients name will be added

        When Signatory change function will called
        Then Signatory will true and added to the files

        When User click on the add receipients button
        Then receipents from files are added

        When User click on the remove receipients button
        Then receipents from files are removed

        When User click on up arrow button
        Then Recipients will be hide on the step 3

        When Receipients Invalid email id will be added
        Then Receipients email validation will check

        When User click on create request button
        Then Create notary request api will called

        When Create request api will call
        Then Create request api get called

        When User click on the close button
        Then Success modal will close
        
        When User click on the yes button
        Then Modal will close

        When User click on save close modal button
        Then Save modal will close successfully
    
    Scenario: Component updates with edit request data
        Given I am a User loading BookNotaryRequest
        When Component receives new edit request props
        Then State should be updated with edit request data
        Then Files array should be populated with document data

        When Component receives empty edit request
        Then State should remain with empty values       

    Scenario: User navigates to BookNotaryRequest for invited request
        Given I am a User loading BookNotaryRequest
        When I navigate to the BookNotaryRequest for invited request
        Then BookNotaryRequest 4 steps form will load with out errors.

        When Get Profile api get called
        Then Get Profile method will call successfully

        When User enters client address1 field
        Then Client address1 will be stored

        When User enters client address2 field
        Then Client address2 will be stored

        When User enters client city field
        Then Client city will be stored

        When User enters client post code field
        Then Client post code will be stored

        When User click on next button without having any errors
        Then User will see next step

    Scenario: Component updates with accepted request data
        Given I am a User loading BookNotaryRequest
        When Component receives accepted request props
        Then State should be updated with accepted request data

        When Component receives empty accepted request
        Then State should handle empty values correctly
    
    Scenario: Transform data function handles different data formats
        Given I am a User loading BookNotaryRequest
        When Transform data is called with base64 data containing comma
        Then Transform data handles base64 without comma

    Scenario: Find next button text returns correct text for different states
        Given I am a User loading BookNotaryRequest
        When User is on step 3 with edit mode
        Then Button text changes based on step and mode

    Scenario: Guest user boooking the request   
        Given Guest User loading BookNotaryRequest  
        When Guest User navigate to BookNotaryRequest
        Then BookNotaryRequest 4 steps form will load with out errors.
        When User enters client fullname
        Then Client fullname will be stored
        When User enters client email
        Then Client email will be stored
        When User selects the code
        Then Client code will be stored
        When User enters client phone number
        Then Client phone number will be stored
        When User enters client address1 field
        Then Client address1 will be stored
        When User enters client address2 field
        Then Client address2 will be stored
        When User enters client city field
        Then Client city will be stored
        When User enters client post code field
        Then Client post code will be stored
        When User click on next button without having any errors
        Then User will see next step
        When I click on save draft button
        Then draft save successfully


    Scenario: Guest user boooking the request and validate guest email
        Given Guest User loading BookNotaryRequest for validate guest email
        When Validate guest  api get called
        Then validate guest api call successfully

        When Validate guest  api get error called
        Then validate guest api error render on the screen
        When Click on login navigate function
        Then Navigate on login screen

