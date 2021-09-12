export function notify(notification) {
    const notificationEvent = new CustomEvent("aqua.notification", {
        detail: { ...notification },
        cancelable: true,
        bubbles: true
    });

    window.dispatchEvent(notificationEvent);
}