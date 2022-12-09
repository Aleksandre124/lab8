import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  private url = 'http://localhost:3000/laptops';

  public getLaptops(): Observable<Laptop[]>{
    return this.http.get<Laptop[]>(this.url);
  }

  public addLaptop(laptop: Laptop){
    laptop.id = uuidv4();
    return this.http.post<Laptop>(this.url, laptop);
  }

  public updateLaptop(laptop: Laptop) {
    return this.http.put<Laptop>(`${this.url}/${laptop.id}`, laptop);
  }

  public deleteLaptop(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  public findLaptopByName(modelName: string) {
    return this.http.get<Laptop[]>(this.url, {
      params: new HttpParams().set('modelName_like', modelName)
    });
  }

  constructor(private http: HttpClient) { }
}

export interface Laptop {
  id: string;
  modelName: string;
  price: string;
}