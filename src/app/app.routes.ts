import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductsListComponent} from "./components/products/products-list/products-list.component";
import {BookListComponent} from "./components/products/books/book-list/book-list.component";
import {MugListComponent} from "./components/products/mugs/mugs-list/mug-list.component";
import {CartListComponent} from "./components/products/cart/cart-list/cart-list.component";
import {AccountComponent} from "./components/account/account/account.component";

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'books', component: BookListComponent},
    {path:'products', component: ProductsListComponent},
    {path:'mugs', component:MugListComponent},
    {path:'cart', component: CartListComponent},
    {path:'account', component: AccountComponent}
];
