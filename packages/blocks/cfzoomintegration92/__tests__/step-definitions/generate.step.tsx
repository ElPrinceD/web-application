import { defineFeature, loadFeature } from 'jest-cucumber';
import generateSignature, {generateVideoSignature} from '../../src/GenerateSignature';
const feature = loadFeature('./__tests__/features/generate-scenario.web.feature');

defineFeature(feature, (test) => {
  const validKey = 'testKey'; 
  const validSecret = 'testSecret';
  
  test('User navigates to cfzoomintegration92 and inputs text', ({ given, when, then }) => {
    let generatedSignature: string | undefined;

    when('I generate a JWT signature with meeting number {string} and role {int}', (meetingNumber: string, role: number) => {
      generatedSignature = generateSignature(validKey, validSecret, meetingNumber, role);
    });

    then('the generated signature should be a valid JWT', () => {
      expect(generatedSignature).toBeDefined();
    });

    when('generating a VideoSdk jwt', () => {
      generatedSignature = generateVideoSignature(validKey, validSecret, "TestSession");
    });

    then('the generated video signature should be a valid JWT', () => {
      expect(generatedSignature).toBeDefined();
    });
  });
});
