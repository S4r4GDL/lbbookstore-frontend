import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BookListComponent} from "./products/books/book-list/book-list.component";

export const routes: Routes = [
    {path:'', component: HomeComponent}
];
