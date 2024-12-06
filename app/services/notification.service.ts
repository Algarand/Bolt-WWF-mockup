import { LocalNotifications } from '@nativescript/local-notifications';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-messaging';

export class NotificationService {
  async scheduleWorkoutReminder(title: string, body: string, at: Date) {
    try {
      await LocalNotifications.schedule([{
        id: Math.random() * 10000,
        title,
        body,
        at,
        forceShowWhenInForeground: true
      }]);
    } catch (error) {
      throw error;
    }
  }

  async setupPushNotifications() {
    try {
      const messaging = firebase.messaging();
      const token = await messaging.getToken();
      console.log('FCM Token:', token);
      
      messaging.onMessage((message) => {
        console.log('Received message:', message);
      });
    } catch (error) {
      throw error;
    }
  }
}