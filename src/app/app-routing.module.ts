import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {DetailedCardComponent} from "./detailed-card/detailed-card.component";


const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'event',
        component: DetailedCardComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
