import * as React from 'react';
// Customizable Area Start
import { Container, Box, Button, Typography, TextField, InputLabel } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { ViewProps } from './StripePayments.web';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
// Customizable Area End

const StripePaymentsView: React.FC<ViewProps> = ({
	// Customizable Area Start
	testID,
	stripePromise,
	stripeClientSecret,
	errorString,
	setOrderNumber,
	orderNumber,
	actionResult,
	stripeInitialised,
	isInStripeCallback,
	onHandleSubmit,
	submitOrderNumberButtonViewProps,
	submitPaymentButtonViewProps,
	loadingViewProps,
	orderIdViewProps,
	stripeMessageViewProps,
	// Customizable Area End
}) => {
	const Render: React.FC<ViewProps> = ({
		testID,
		errorString,
		setOrderNumber,
		orderNumber,
		actionResult,
		stripeInitialised,
		isInStripeCallback,
		onHandleSubmit,
		submitOrderNumberButtonViewProps,
		submitPaymentButtonViewProps,
		orderIdViewProps,
		stripeMessageViewProps,
	}) => {
		// Customizable Area Start
		const stripe = useStripe();
		const stripeElements = useElements();

		if (errorString) {
			return (
				<ThemeProvider theme={theme}>
					<Container data-testid={testID} maxWidth={'sm'}>
						<Box sx={webStyle.mainWrapper}>
							<Typography variant="h1">{stripeMessageViewProps.errorValue}</Typography>
							<Typography>{errorString}</Typography>
						</Box>
					</Container>
				</ThemeProvider>
			);
		}
		if (actionResult) {
			return (
				<ThemeProvider theme={theme}>
					<Container data-testid={testID} maxWidth={'sm'}>
						<Box sx={webStyle.mainWrapper}>
							<Typography variant="body1">{stripeMessageViewProps.successValue}</Typography>
							<Typography variant="body1">Payment Status Message</Typography>
							<Typography variant="body1">{actionResult}</Typography>
						</Box>
					</Container>
				</ThemeProvider>
			);
		} else if (!orderNumber && !isInStripeCallback) {
			return (
				<ThemeProvider theme={theme}>
					<Container data-testid={testID} maxWidth={'sm'}>
						<Box sx={webStyle.mainWrapper}>
							<form
								onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
									event.preventDefault();
									const element = event.currentTarget.elements.namedItem('order-number') as HTMLInputElement;
									setOrderNumber(+element.value);
								}}
							>
								<Box sx={webStyle.mainWrapper}>
									<Box sx={webStyle.horizontalWrapper}>
										<InputLabel htmlFor="order-number">{orderIdViewProps.value}</InputLabel>
										<TextField
											variant="outlined"
											name="order-number"
											id="order-number"
											label="Order number"
										></TextField>
									</Box>
									<Button
										style={webStyle.submitButton}
										type="submit"
										aria-label="Submit"
										data-testid="submit-order-number"
									>
										{submitOrderNumberButtonViewProps.value}
									</Button>
								</Box>
							</form>
						</Box>
					</Container>
				</ThemeProvider>
			);
		} else if (stripeInitialised) {
			return (
				<ThemeProvider theme={theme}>
					<Container data-testid={testID} maxWidth={'sm'}>
						<Box sx={webStyle.mainWrapper}>
							<form
								onSubmit={(event) => {
									event.preventDefault();
									onHandleSubmit(event, stripe, stripeElements);
								}}
							>
								<Box sx={webStyle.mainWrapper}>
									<PaymentElement />
									<Button style={webStyle.submitButton} type="submit" data-testid="submit-payment">
										{submitPaymentButtonViewProps.value}
									</Button>
								</Box>
							</form>
						</Box>
					</Container>
				</ThemeProvider>
			);
		}
		// Customizable Area End

		return (
			// Customizable Area Start
			<ThemeProvider theme={theme}>
				<Container data-testid={testID} maxWidth={'sm'}>
					<Box sx={webStyle.mainWrapper}>
						<Typography>{loadingViewProps.value}</Typography>
					</Box>
				</Container>
			</ThemeProvider>
		);
		// Customizable Area End
	};

	const viewProps: ViewProps = {
		testID: testID,
		errorString,
		stripePromise: stripePromise,
		stripeClientSecret: stripeClientSecret,
		setOrderNumber: setOrderNumber,
		orderNumber: orderNumber,
		actionResult: actionResult,
		stripeInitialised: stripeInitialised,
		isInStripeCallback: isInStripeCallback,
		onHandleSubmit: onHandleSubmit,
		submitOrderNumberButtonViewProps,
		submitPaymentButtonViewProps,
		loadingViewProps,
		orderIdViewProps,
		stripeMessageViewProps,
	};

	return (
		<Elements stripe={stripePromise} options={{ clientSecret: stripeClientSecret }} key={stripeClientSecret}>
			<Render {...viewProps} />
		</Elements>
	);
};

const theme = createTheme({
	// Customizable Area Start
	overrides: {
		MuiFormControlLabel: {
			label: {
				width: '100%',
			},
		},
	},
	// Customizable Area End
});

const webStyle = {
	// Customizable Area Start
	mainWrapper: {
		display: 'flex',
		fontFamily: 'Roboto-Medium',
		flexDirection: 'column',
		paddingTop: '32px',
		paddingBottom: '32px',
		background: '#fff',
		gap: '1rem',
	},
	horizontalWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '2rem',
	},
	submitButton: {
		backgroundColor: '#6200EE',
		color: '#fff',
	},
	cancelButton: {
		backgroundColor: '#FF0000',
	},
	// Customizable Area End
};

export default StripePaymentsView;
