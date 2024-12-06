import { Frame } from '@nativescript/core';

export class NavigationService {
    navigate(page: string, context?: any) {
        Frame.topmost().navigate({
            moduleName: page,
            context: context,
            clearHistory: false
        });
    }

    navigateWithClearHistory(page: string, context?: any) {
        Frame.topmost().navigate({
            moduleName: page,
            context: context,
            clearHistory: true
        });
    }

    goBack() {
        Frame.topmost().goBack();
    }
}