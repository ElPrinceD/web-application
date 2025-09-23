Feature: cfzoomintegration92

    Scenario: User navigates to cfzoomintegration92 and inputs text
        When I generate a JWT signature with meeting number {string} and role {int}
        Then the generated signature should be a valid JWT

        When generating a VideoSdk jwt
        Then the generated video signature should be a valid JWT