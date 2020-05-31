import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Favourites} from "../interfaces/favourites.interface";
import {Observable} from "rxjs";
import {UserReview} from "../interfaces/userreview.interface";

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  getUserFavourites(userID: number): Observable<Favourites[]> {
    let url = 'http://localhost:8200/user/favourites/short?user=' + userID;
    return this.httpClient.get<Favourites[]>(url, {withCredentials: true}).pipe();
  }

  addUserFavourite(favourite: Favourites): Observable<any> {
    let url = "http://localhost:8200/user/favourites";
    return this.httpClient.post<any>(url, favourite, {withCredentials: true}).pipe();
  }

  removeUserFavourite(favourite: Favourites): Observable<any> {
    let url = "http://localhost:8200/user/favourites?userId=" + favourite.userId + "&movieId=" + favourite.movieUrl;
    const options = {
      withCredentials: true,
    };

    return this.httpClient.delete<any>(url, options).pipe();
  }
}
