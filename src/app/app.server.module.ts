import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
// Lazy load
import { ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        ModuleMapLoaderModule // Lazy load
    ],
    bootstrap: [AppComponent],
})

export class AppServerModule {}