Feature: PaymentOptions

    Scenario: User navigates to PaymentOptions
        Given I am a User loading PaymentOptions
        When I navigate to the PaymentOptions
        Then PaymentOptions will load with out errors