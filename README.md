# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.11.

The application will give you two pages, one for Current Weather and one for a 5 Day Forecast, both accesible through the top navigation, you may also set your preffered units to the metric system or imperial system, and this will be saved to your browsers local storage for subsequent requests and reloads.

The application takes advantage of NGRX for state management and also for executing app wide actions/events, acting as a top-level controller that has access to all modules ( features ) included in the app's primary module. NGRX is also used as a module's top-level controller as well, each feature has a store of it's own to control specific actions/events within the feature's scope. The Shared directory has components/modules that are used throughout the application with the intent of them being reusable anywhere within the app scope.

## Development server

Before running the app ensure you are using node 10+ ( 12 preffered ). I encourage you to install Node Version Manager https://github.com/nvm-sh/nvm.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
