import { browser } from '$app/environment';

/**
 * Track a custom event with Umami analytics
 * @param eventName The name of the event to track
 * @param eventData Optional data to associate with the event
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
    if (browser && (window as any).umami) {
        (window as any).umami.track(eventName, eventData);
    }
}
