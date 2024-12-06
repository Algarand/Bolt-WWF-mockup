import { firebase } from '@nativescript/firebase-core';
import { User, UserStats } from '../models/user.model';

export class UserService {
  private usersRef = firebase.database().ref('users');
  private statsRef = firebase.database().ref('userStats');

  async getUserProfile(userId: string): Promise<User> {
    const snapshot = await this.usersRef.child(userId).once('value');
    return snapshot.val();
  }

  async updateUserProfile(userId: string, userData: Partial<User>): Promise<void> {
    await this.usersRef.child(userId).update(userData);
  }

  async getUserStats(userId: string): Promise<UserStats> {
    const snapshot = await this.statsRef.child(userId).once('value');
    return snapshot.val() || {
      totalWorkouts: 0,
      totalCaloriesBurned: 0,
      streakDays: 0
    };
  }

  async updateUserStats(userId: string, stats: Partial<UserStats>): Promise<void> {
    await this.statsRef.child(userId).update(stats);
  }
}