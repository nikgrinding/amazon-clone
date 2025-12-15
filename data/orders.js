export const orders = JSON.parse(localStorage.getItem("amazonOrders")) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem("amazonOrders", JSON.stringify(orders));
}

export function getOrder(orderId) {
    let matchingOrder;
    orders.forEach((order) => {
        if (order.id === orderId) {
            matchingOrder = order;
        }
    });
    return matchingOrder;
}
