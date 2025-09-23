Feature: PaymentOptions

    Scenario: User navigates to PaymentOptions
        Given I am a User loading PaymentOptions
        When I navigate to the PaymentOptions
        Then PaymentOptions will load with out errors

        When User clicks on back arrow button
        Then PaymentOptions page will unmount

        When user selects credit/debit option
        Then credit/debit option is selected

        When user clicks on the continue button
        Then user gets redirected to Stripe payment page