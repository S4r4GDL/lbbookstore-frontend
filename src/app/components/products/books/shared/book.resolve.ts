import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {BookService} from "./book.service";
import {Book} from "./book";

@Injectable({
  providedIn: 'root'
})
export class BookResolve implements Resolve<Book[]> {
  constructor(
    private router: Router,
    private service: BookService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book[]> {

    return new Observable(observer => {
      this.service.getAll().subscribe(
        {
          next: data => {
            observer.next(data);
            observer.complete();
          },
          error: error => {
            console.log("Resolve");
            observer.next(undefined);
            observer.error(error);

          }
        });
    });
  }
}
