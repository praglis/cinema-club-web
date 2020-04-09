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
  ) { }

  getUserFavourites(userID: number) : Observable<Favourites[]> {
    let url = 'http://localhost:8200/user/favourites/short?user=' + userID;
    return this.httpClient.get<Favourites[]>(url).pipe();
  }

  addUserFavourite(favourite: Favourites): Observable<any> {
    let url = "http://localhost:8200/user/favourites";
    return this.httpClient.post<any>(url, favourite, { withCredentials: true }).pipe();
  }

  removeUserFavourite(favourite: Favourites) : Observable<any>{
    let url = "http://localhost:8200/user/favourites?userId=" + favourite.userId + "&movieId=" + favourite.movieUrl;
    console.log(url);
    const options = {
      withCredentials: true,
    };

    console.log(options);
    return this.httpClient.delete<any>(url).pipe();
  }
}
