import { cart } from '../../data/cart-class.js';

describe('test suite: addToCart', () => {
	beforeEach(() => {
		spyOn(localStorage, 'setItem');
	});

	it('adds an existing product to the cart', () => {
		cart.cartItems = [
			{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 1,
				deliveryOptionId: '1',
			},
		];

		cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
		expect(cart.cartItems.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(localStorage.setItem).toHaveBeenCalledWith(
			'amazonCart-oop',
			JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 2,
					deliveryOptionId: '1',
				},
			])
		);
		expect(cart.cartItems[0].productId).toEqual(
			'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
		);
		expect(cart.cartItems[0].quantity).toEqual(2);
	});

	it('adds a new product to the cart', () => {
		cart.cartItems = [];

		cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
		expect(cart.cartItems.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(localStorage.setItem).toHaveBeenCalledWith(
			'amazonCart-oop',
			JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			])
		);
		expect(cart.cartItems[0].productId).toEqual(
			'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
		);
		expect(cart.cartItems[0].quantity).toEqual(1);
	});
});

describe('test suite: removeFromCart', () => {
	beforeEach(() => {
		spyOn(localStorage, 'setItem');
	});

	it('removes a product from the cart', () => {
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			]);
		});
		cart.cartItems = [
			{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 1,
				deliveryOptionId: '1',
			},
		];

		cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.cartItems.length).toEqual(0);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(localStorage.setItem).toHaveBeenCalledWith(
			'amazonCart-oop',
			JSON.stringify([])
		);
	});

	it('does nothing if product is not in the cart', () => {
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			]);
		});
		cart.cartItems = [
			{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 1,
				deliveryOptionId: '1',
			},
		];

		cart.removeFromCart('does-not-exist');
		expect(cart.cartItems.length).toEqual(1);
		expect(cart.cartItems[0].productId).toEqual(
			'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
		);
		expect(cart.cartItems[0].quantity).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(localStorage.setItem).toHaveBeenCalledWith(
			'amazonCart-oop',
			JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			])
		);
	});
});

describe('test suite: updateDeliveryOption', () => {
	beforeEach(() => {
		spyOn(localStorage, 'setItem');
	});

	it('updates the delivery option', () => {
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			]);
		});
		cart.cartItems = [
			{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 1,
				deliveryOptionId: '1',
			},
		];

		cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
		expect(cart.cartItems.length).toEqual(1);
		expect(cart.cartItems[0].productId).toEqual(
			'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
		);
		expect(cart.cartItems[0].quantity).toEqual(1);
		expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(localStorage.setItem).toHaveBeenCalledWith(
			'amazonCart-oop',
			JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '3',
				},
			])
		);
	});

	it('does nothing if the product is not in the cart', () => {
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			]);
		});
		cart.cartItems = [
			{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 1,
				deliveryOptionId: '1',
			},
		];

		cart.updateDeliveryOption('does-not-exist', '3');
		expect(cart.cartItems.length).toEqual(1);
		expect(cart.cartItems[0].productId).toEqual(
			'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
		);
		expect(cart.cartItems[0].quantity).toEqual(1);
		expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
		expect(localStorage.setItem).toHaveBeenCalledTimes(0);
	});

	it('does nothing if the delivery option does not exist', () => {
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			]);
		});
		cart.cartItems = [
			{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 1,
				deliveryOptionId: '1',
			},
		];

		cart.updateDeliveryOption(
			'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
			'does-not-exist'
		);
		expect(cart.cartItems.length).toEqual(1);
		expect(cart.cartItems[0].productId).toEqual(
			'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
		);
		expect(cart.cartItems[0].quantity).toEqual(1);
		expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
		expect(localStorage.setItem).toHaveBeenCalledTimes(0);
	});
});
