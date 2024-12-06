import { Observable } from '@nativescript/core';
import { NavigationService } from './services/navigation.service';

export class MainViewModel extends Observable {
    private navigationService: NavigationService;

    constructor() {
        super();
        this.navigationService = new NavigationService();
    }

    onStartWorkout() {
        this.navigationService.navigate('components/workout/workout-form');
    }

    onViewProgress() {
        this.navigationService.navigate('components/dashboard/dashboard-page');
    }

    onExerciseLibrary() {
        this.navigationService.navigate('components/exercise/exercise-selection-dialog');
    }
}