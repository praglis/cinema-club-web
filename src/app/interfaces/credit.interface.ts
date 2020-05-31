import {Cast} from "./cast.interface";
import {Crew} from "./crew.interface";

export interface Credit {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
