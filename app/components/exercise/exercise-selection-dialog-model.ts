import { Observable } from '@nativescript/core';
import { Exercise } from '../../models/exercise.model';
import { ExerciseService } from '../../services/exercise.service';

export class ExerciseSelectionDialogModel extends Observable {
    private exerciseService: ExerciseService;
    private _exercises: (Exercise & { selected: boolean })[] = [];
    private _searchQuery = '';
    private _loading = false;

    constructor() {
        super();
        this.exerciseService = new ExerciseService();
        this.loadExercises();
    }

    get exercises() {
        return this._exercises;
    }

    get searchQuery() {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
        }
    }

    get hasSelection() {
        return this._exercises.some(e => e.selected);
    }

    async loadExercises() {
        try {
            this._loading = true;
            this.notifyPropertyChange('loading', true);

            const exercises = await this.exerciseService.getExercises();
            this._exercises = exercises.map(e => ({ ...e, selected: false }));
            this.notifyPropertyChange('exercises', this._exercises);
        } catch (error) {
            console.error('Error loading exercises:', error);
        } finally {
            this._loading = false;
            this.notifyPropertyChange('loading', false);
        }
    }

    async onSearch() {
        if (!this._searchQuery) {
            await this.loadExercises();
            return;
        }

        try {
            this._loading = true;
            this.notifyPropertyChange('loading', true);

            const results = await this.exerciseService.searchExercises(this._searchQuery);
            this._exercises = results.map(e => ({ ...e, selected: false }));
            this.notifyPropertyChange('exercises', this._exercises);
        } catch (error) {
            console.error('Error searching exercises:', error);
        } finally {
            this._loading = false;
            this.notifyPropertyChange('loading', false);
        }
    }

    onExerciseSelect(args: { index: number }) {
        const exercise = this._exercises[args.index];
        exercise.selected = !exercise.selected;
        this.notifyPropertyChange('exercises', this._exercises);
        this.notifyPropertyChange('hasSelection', this.hasSelection);
    }

    getSelectedExercises(): Exercise[] {
        return this._exercises.filter(e => e.selected);
    }
}