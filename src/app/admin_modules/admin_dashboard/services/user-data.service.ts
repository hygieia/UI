import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

   adminRoute = '/api/admin';
   userRoute = '/api/users';

  constructor(private http:HttpClient) { }

  apitokens() {
    const route = this.adminRoute + "/apitokens";
    return this.http.get(route);
  }

  users() {
    return this.http.get(this.userRoute);
  }

  //   // reusable helper
  //   function getPromise(route) {
  //     return $http.get(route).then(function (response) {
  //       console.log("Data="+ JSON.stringify(response.data));
  //         return response.data;
  //     });
  // }


// function promoteUserToAdmin(user) {
//   var route = adminRoute + "/users/addAdmin";
//   return $http.post(route, user);
// }

// function demoteUserFromAdmin(user) {
// var route = adminRoute + "/users/removeAdmin";
// return $http.post(route, user);
// }

 createToken(apitoken) {
  var route = this.adminRoute + "/createToken";
  return this.http.post(route, apitoken);
}



 deleteToken(id) {
  var route = this.adminRoute + "/deleteToken";
  return this.http.delete(route + '/' + id)
}

 updateToken(apiToken, id) {
  var route = this.adminRoute + "/updateToken";
  return this.http.post(route + '/' + id, apiToken);
}

}
