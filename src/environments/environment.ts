// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrlSpring:"https://sistemas-ventas-api.herokuapp.com/ventas/v1",
  apiUrlNodeJS:"https://com-general-api.herokuapp.com",
  //apiUrlNodeJS:"http://localhost:9090",
  //apiUrlSpring:"http://localhost:8080/ventas/v1",
 // token:"Bearer "+JSON.parse(localStorage.getItem("token")),
  languaje:"es"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
