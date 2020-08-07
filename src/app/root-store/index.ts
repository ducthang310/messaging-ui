import { RootStoreModule } from './root-store.module';
import * as RootStoreState from './root-state';
/**
 * Feature modules
 */
export * from './app-store';
export * from './router-store';


export { RootStoreState, RootStoreModule };
