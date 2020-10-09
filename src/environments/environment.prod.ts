export const environment = {
  production: true,
  apiUrl:"https://sistema-ventas-api.herokuapp.com/ventas/v1",
  apiUrl2:"https://sistema-ventas-api.herokuapp.com/ventas/v1",
  token:"Bearer "+JSON.parse(localStorage.getItem("token"))
};
