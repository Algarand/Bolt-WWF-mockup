import { Observable, ShowModalOptions, View } from '@nativescript/core';
import { Exercise } from '../../models/exercise.model';
import { ExerciseService } from '../../services/exercise.service';
import { WorkoutService, Workout } from '../../services/workout.service';
import { calculateCaloriesBurned } from '../../utils/fitness.utils';

export class WorkoutFormViewModel extends Observable {
    private exerciseService: ExerciseService;
    private workoutService: WorkoutService;
    
    workoutTypes = ['Strength Training', 'Cardio', 'Flexibility', 'HIIT'];
    intensityOptions = ['Low', 'Medium', 'High'];
    
    private _selectedWorkoutType = 0;
    private _duration = '';
    private _selectedIntensity = 1;
    private _selectedExercises: Exercise[] = [];
    private _loading = false;

    constructor() {
        super();
        this.exerciseService = new ExerciseService();
        this.workoutService = new WorkoutService();
    }

    get selectedWorkoutType(): number {
        return this._selectedWorkoutType;
    }

    set selectedWorkoutType(value: number) {
        if (this._selectedWorkoutType !== value) {
            this._selectedWorkoutType = value;
            this.notifyPropertyChange('selectedWorkoutType', value);
        }
    }

    get duration(): string {
        return this._duration;
    }

    set duration(value: string) {
        if (this._duration !== value) {
            this._duration = value;
            this.notifyPropertyChange('duration', value);
        }
    }

    get selectedExercises(): Exercise[] {
        return this._selectedExercises;
    }

    async onAddExercise(args: { object: View }) {
        const modalOptions: ShowModalOptions = {
            context: {},
            closeCallback: (exercises: Exercise[]) => {
                if (exercises) {
                    this._selectedExercises = [...this._selectedExercises, ...exercises];
                    this.notifyPropertyChange('selectedExercises', this._selectedExercises);
                }
            },
            fullscreen: true
        };

        const page = args.object.page;
        page.showModal('components/exercise/exercise-selection-dialog', modalOptions);
    }

    onRemoveExercise(args: { index: number }) {
        this._selectedExercises.splice(args.index, 1);
        this.notifyPropertyChange('selectedExercises', this._selectedExercises);
    }

    async onStartWorkout() {
        if (!this.validateForm()) {
            return;
        }

        try {
            this._loading = true;
            this.notifyPropertyChange('loading', true);

            const workout: Workout = {
                id: Date.now().toString(),
                userId: 'current-user-id', // Replace with actual user ID
                type: this.workoutTypes[this._selectedWorkoutType],
                duration: parseInt(this._duration),
                calories: calculateCaloriesBurned(
                    this.workoutTypes[this._selectedWorkoutType],
                    parseInt(this._duration),
                    70, // Default weight, should be replaced with user's actual weight
                    this.intensityOptions[this._selectedIntensity].toLowerCase() as any
                ),
                date: new Date().toISOString().split('T')[0],
                exercises: this._selectedExercises.map(e => ({
                    name: e.name,
                    sets: 0,
                    reps: 0
                }))
            };

            await this.workoutService.addWorkout(workout);
            // Navigate back to dashboard
            const frame = require('@nativescript/core').Frame;
            frame.topmost().goBack();
        } catch (error) {
            console.error('Error starting workout:', error);
            // Show error dialog
        } finally {
            this._loading = false;
            this.notifyPropertyChange('loading', false);
        }
    }

    private validateForm(): boolean {
        if (!this._duration || parseInt(this._duration) <= 0) {
            alert('Please enter a valid duration');
            return false;
        }

        if (this._selectedExercises.length === 0) {
            alert('Please select at least one exercise');
            return false;
        }

        return true;
    }
}