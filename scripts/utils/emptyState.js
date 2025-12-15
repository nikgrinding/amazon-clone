export function renderEmptyState(container, message) {
    document.querySelector(container).innerHTML = `
        <div style="text-align: center; padding: 100px 20px;">
            <h2>${message}</h2>
            <a href="index.html">
                <button class="button-primary" style="margin-top: 20px; padding: 10px 30px;">
                    Start Shopping
                </button>
            </a>
        </div>
    `;
}
