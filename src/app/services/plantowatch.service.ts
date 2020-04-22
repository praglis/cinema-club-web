import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Favourites} from "../interfaces/favourites.interface";
import {Observable} from "rxjs";
import {UserReview} from "../interfaces/userreview.interface";

@Injectable({
  providedIn: 'root'
})
export class PlanToWatchService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getUserPlanToWatch(userID: number) : Observable<Favourites[]> {
    let url = 'http://localhost:8200/user/plantowatch/short?user=' + userID;
    return this.httpClient.get<Favourites[]>(url, { withCredentials: true }).pipe();
  }

  addUserPlanToWatch(favourite: Favourites): Observable<any> {
    let url = "http://localhost:8200/user/plantowatch";
    return this.httpClient.post<any>(url, favourite, { withCredentials: true }).pipe();
  }

  removeUserPlanToWatch(favourite: Favourites) : Observable<any>{
    let url = "http://localhost:8200/user/plantowatch?userId=" + favourite.userId + "&movieId=" + favourite.movieUrl;
    const options = {
      withCredentials: true,
    };

    return this.httpClient.delete<any>(url, options).pipe();
  }
}
