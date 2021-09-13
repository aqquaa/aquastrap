export function notify(notification, { id, key }) {
    const notificationEvent = new CustomEvent("aqua.notification", {
        detail: { component: { id, key }, ...notification },
        cancelable: true,
        bubbles: true
    });

    window.dispatchEvent(notificationEvent);
}