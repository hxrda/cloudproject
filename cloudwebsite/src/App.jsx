import { useState } from "react";
import {
	Button,
	Radio,
	RadioGroup,
	FormControlLabel,
	Typography,
	Stack,
	Box,
} from "@mui/material";

const products = [
	{ id: 1, name: "Laptop", price: 1199.99 },
	{ id: 2, name: "Mouse", price: 24.99 },
	{ id: 3, name: "Keyboard", price: 59.99 },
	{ id: 4, name: "Monitor", price: 299.99 },
	{ id: 5, name: "External Hard Drive", price: 99.99 },
	{ id: 6, name: "Headphones", price: 89.99 },
];

const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer"];

function App() {
	//States:
	const [selectedProduct, setSelectedProduct] = useState(products[0]);
	const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
	const [transaction, setTransaction] = useState({
		id: crypto.randomUUID(),
		type: "PURCHASE",
		date: new Date().toISOString(),
		paymentType: selectedPayment,
		productId: selectedProduct.id,
		productName: selectedProduct.name,
		amount: selectedProduct.price,
	});

	// Functions
	const handlePostTransaction = (type) => {
		const newTransaction = {
			id: crypto.randomUUID(),
			type,
			date: new Date().toISOString(),
			paymentType: selectedPayment,
			productId: selectedProduct.id,
			productName: selectedProduct.name,
			amount: selectedProduct.price,
		};

		setTransaction(newTransaction);

		console.log(newTransaction);

		fetch("https://insertActualApiEndpointHere.com/transactions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTransaction),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => console.log("Order sent successfully:", data))
			.catch((error) => console.error("Error posting order:", error));
	};

	//Rendering
	return (
		<Box sx={{ p: 3, maxWidth: "600px", margin: "0 auto" }}>
			<Typography variant="h4" gutterBottom>
				Simple E-Commerce App
			</Typography>

			{/* Product Selection */}
			<Typography variant="h6">Select a Product</Typography>
			<Stack spacing={2} direction="row">
				{products.map((product) => (
					<Button
						key={product.id}
						variant={
							selectedProduct.id === product.id ? "contained" : "outlined"
						}
						onClick={() => setSelectedProduct(product)}
					>
						{product.name} (${product.price})
					</Button>
				))}
			</Stack>

			{/* Payment Method Selection */}
			<Typography variant="h6" sx={{ mt: 3 }}>
				Select a Payment Method
			</Typography>
			<RadioGroup
				row
				value={selectedPayment}
				onChange={(e) => setSelectedPayment(e.target.value)}
			>
				{paymentMethods.map((method) => (
					<FormControlLabel
						key={method}
						value={method}
						control={<Radio />}
						label={method}
					/>
				))}
			</RadioGroup>

			{/* Transaction Summary */}
			<Typography variant="h6" sx={{ mt: 3 }}>
				Your Transaction: {selectedProduct.name} (${selectedProduct.price})
			</Typography>

			{/* Purchase and Return Buttons */}
			<Stack direction="row" spacing={2} sx={{ mt: 3 }}>
				<Button
					variant="contained"
					color="primary"
					onClick={() => handlePostTransaction("PURCHASE")}
				>
					Purchase
				</Button>
				<Button
					variant="outlined"
					color="secondary"
					onClick={() => handlePostTransaction("REFUND")}
				>
					Return
				</Button>
			</Stack>
		</Box>
	);
}

export default App;
