let orders = [];
try {
    orders = JSON.parse(localStorage.getItem("amazonOrders")) || [];
} catch (error) {
    orders = [];
}
export { orders };

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    try {
        localStorage.setItem("amazonOrders", JSON.stringify(orders));
    } catch (error) {
        console.error("Failed to save orders:", error);
    }
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
