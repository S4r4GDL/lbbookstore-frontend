import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductsListComponent} from "./components/products/products-list/products-list.component";
import {BookListComponent} from "./components/products/books/book-list/book-list.component";
import {MugListComponent} from "./components/products/mugs/mugs-list/mug-list.component";
import {CartListComponent} from "./components/products/cart/cart-list/cart-list.component";
import {AccountComponent} from "./components/account/account.component";
import {BookFormComponent} from "./components/products/books/book-form/book-form.component";
import {BookResolve} from "./components/products/books/shared/book.resolve";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'books', component: BookListComponent, resolve:{bookData:BookResolve},},
    {path:'products', component: ProductsListComponent},
    {path:'mugs', component:MugListComponent},
    {path:'cart', component: CartListComponent},
    {path:'account', component: AccountComponent},
    {path: 'new-book', component: BookFormComponent},
    {path: 'edit/:id', component: BookFormComponent},
    {path: 'register', component: RegisterComponent},
    {path:'login', component: LoginComponent}
];

