import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
const navigation = require('react-navigation');
import StripePayments, { ViewProps, ControllerProps } from '../../src/StripePayments.web';
import { Message } from '../../../../framework/src/Message';
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import { RenderResult, act, render, waitFor, fireEvent, screen, cleanup } from '@testing-library/react';
import * as helpers from '../../../../framework/src/Helpers';

jest.useFakeTimers();

const paymentIntentReferenceMock = {
	data: {
		id: 'TEST_ID',
		type: 'payment_intent',
		attributes: {
			client_secret: 'TEST_CLIENT_SECRET',
			amount: 8024,
			currency: 'gbp',
			payable_reference: 32,
			payment_intent_id: 'TEST_CLIENT_INTENT_ID',
			customer_id: 'TEST_CUSTOMER_ID',
		},
	},
};
let apiCallId: string = '';
let receiveCallback: (from: string, message: Message) => void = (from: string, message: Message) => {};
const sendNetworkRequestMock = jest.fn((callIdRef: React.MutableRefObject<string>) => {
	apiCallId = require('uuid/v4')();
	callIdRef.current = apiCallId;
});
const setReveiveCallbackMock = jest.fn((callback: typeof receiveCallback) => (receiveCallback = callback));
const sendBlockMessageMock = jest.fn(() => {});
jest.mock('../../../utilities/src/hooks/useRunEngine.ts', () => ({
	useRunEngine: () => ({
		sendMessage: jest.fn(),
		subscribe: jest.fn(),
		debugLog: jest.fn(),
		sendBlockMessage: sendBlockMessageMock,
		sendNetworkRequest: sendNetworkRequestMock,
		setReceiveCallback: setReveiveCallbackMock,
		unsubscribeFromMessage: jest.fn(),
	}),
}));
const confirmPayment = jest.fn().mockReturnValue(Promise.resolve({}));
jest.mock('@stripe/react-stripe-js', () => {
	const stripe = jest.requireActual('@stripe/react-stripe-js');
	return {
		...stripe,
		useElements: () => true,
		useStripe: () => {
			return {
				confirmPayment: confirmPayment,
			};
		},
	};
});
jest.mock('@stripe/stripe-js', () => {
	const stripe = jest.requireActual('@stripe/stripe-js');
	return {
		...stripe,
		loadStripe: jest.fn().mockReturnValue(
			Promise.resolve({
				dataInserted: 1,
			})
		),
	};
});
jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
const defaultControllerProps: ControllerProps = {
	navigation: navigation,
	id: 'StripePayments',
};

const getStorageTokenMock = jest.fn((key: string, _: boolean) => {
	return 'TEST_TOKEN';
});

jest.mock('../../../../framework/src/Utilities.ts'),
	() => {
		const utilities = jest.requireActual('../../../../framework/src/Utilities.ts');
		return {
			...utilities,
			getStorageData: getStorageTokenMock,
		};
	};

const renderComponentScreenWithToken = async (props?: ControllerProps) => {
	const stripeScreenProps = props ? props : defaultControllerProps;
	const renderedComponent = render(<StripePayments {...stripeScreenProps} />);
	act(() => {
		const sessionResponseMessage = new Message(getName(MessageEnum.SessionResponseMessage));
		sessionResponseMessage.initializeFromObject({
			[getName(MessageEnum.SessionResponseToken)]: 'TEST_TOKEN',
		});
		receiveCallback('Unit Test', sessionResponseMessage);
	});
	return renderedComponent;
};
const renderComponentScreenWithoutToken = async (props?: ControllerProps) => {
	const stripeScreenProps = props ? props : defaultControllerProps;
	const renderedComponent = render(<StripePayments {...stripeScreenProps} />);
	return renderedComponent;
};
const feature = loadFeature('./__tests__/features/stripe-web-controller-scenario.feature');

defineFeature(feature, (test) => {
	let stripePayments: any;
	beforeEach(async () => {
		jest.resetModules();
		jest.clearAllMocks();
		cleanup();
		stripePayments = await renderComponentScreenWithToken();
	});
	test('The stripe payment block loads', ({ when, then }) => {
		when('I navigate to the payment block', async () => {
			// stripePayments = await renderComponentScreenWithToken();
		});
		then('the payment block loads', () => {
			expect(stripePayments).toBeTruthy();
		});
	});
	test('The block can successfully subscribes to all app services', ({ when, then }) => {
		when('I navigate to the payment block', async () => {
			// stripePayments = await renderComponentScreen();
		});
		then('it links in with run engine', () => {
			expect(setReveiveCallbackMock).toBeCalled();
			expect(sendBlockMessageMock).toBeCalled();
		});
	});
	test('I do not enter an order number and submit', ({ given, when, then }) => {
		when('I enter a null order number manually and submit it', async () => {
			const orderNumberInput = stripePayments.getByLabelText('Order number');
			fireEvent.change(orderNumberInput, { target: { value: '' } });
			const submitButton = stripePayments.getByTestId('submit-order-number');
			fireEvent.click(submitButton);
		});
		then('I see an error message', () => {
			const errorText = stripePayments.getByText('No order number');
			expect(errorText).toBeInTheDocument();
		});
	});
	test('I enter the order number manually and receive an intent', async ({ given, when, then }) => {
		when('I enter the order number manually and submit it', async () => {
			await waitFor(() => {
				const orderNumberInput = stripePayments.getByLabelText('Order number');
				act(() => {
					fireEvent.change(orderNumberInput, { target: { value: '32' } });
				});
			});
			await waitFor(() => {
				const submitButton = stripePayments.getByTestId('submit-order-number');
				act(() => {
					fireEvent.click(submitButton);
				});
			});
		});
		then('I receive a payment intent', async () => {
			act(() => {
				const sessionResponseMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
				sessionResponseMessage.initializeFromObject({
					[getName(MessageEnum.RestAPIResponceSuccessMessage)]: paymentIntentReferenceMock,
				});
				receiveCallback('UNIT_TEST', sessionResponseMessage);
			});

			await waitFor(
				() => {
					const cardInput = stripePayments.getByTestId('submit-payment');
					expect(cardInput).toBeTruthy();
				},
				{ timeout: 10000 }
			);
		});
	});
	test('I can attempt to make a payment', async ({ given, when, then }) => {
		given('I enter the order number manually and submit it', async () => {
			await waitFor(() => {
				const orderNumberInput = stripePayments.getByLabelText('Order number');
				act(() => {
					fireEvent.change(orderNumberInput, { target: { value: '32' } });
				});
			});
			await waitFor(() => {
				const submitButton = stripePayments.getByTestId('submit-order-number');
				act(() => {
					fireEvent.click(submitButton);
				});
			});
		});
		when('I attempt to make a payment', async () => {
			await waitFor(() => {
				act(() => {
					const sessionResponseMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
					sessionResponseMessage.initializeFromObject({
						[getName(MessageEnum.RestAPIResponceSuccessMessage)]: paymentIntentReferenceMock,
					});
					receiveCallback('UNIT_TEST', sessionResponseMessage);
				});
			});
			await waitFor(
				() => {
					const submitButton = stripePayments.getByTestId('submit-payment');
					act(() => {
						fireEvent.click(submitButton);
					});
				},
				{ timeout: 10000 }
			);
			await waitFor(() => {
				const submitButton = stripePayments.getByTestId('submit-payment');
				act(() => {
					fireEvent.click(submitButton);
				});
			});
		});
		then('The payment is submitted to stripe', async () => {
			await waitFor(
				() => {
					expect(confirmPayment).toBeCalled();
				},
				{ timeout: 10000 }
			);
		});
	});
	test('Check the token retrival system works', async ({ given, when, then }) => {
		given('There is a token in storage', async () => {
			cleanup();
			stripePayments = await renderComponentScreenWithoutToken();
		});
		when('I attempt to get an intent with no token stored in the application', async () => {
			const sessionResponseMessage = new Message(getName(MessageEnum.SessionResponseMessage));
			sessionResponseMessage.initializeFromObject({
				[getName(MessageEnum.SessionResponseToken)]: undefined,
			});
			receiveCallback('Unit Test', sessionResponseMessage);
			await waitFor(
				() => {
					const orderNumberInput = stripePayments.getByLabelText('Order number');
					act(() => {
						fireEvent.change(orderNumberInput, { target: { value: '32' } });
					});
				},
				{ timeout: 10000 }
			);
		});
		then('I should be successful with stored token', async () => {
			await waitFor(
				() => {
					const submitButton = stripePayments.getByTestId('submit-order-number');
					expect(submitButton).toBeTruthy();
				},
				{ timeout: 10000 }
			);
		});
	});
});
