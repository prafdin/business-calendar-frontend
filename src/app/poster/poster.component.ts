import { Component } from '@angular/core';

@Component({
    selector: 'poster',
    templateUrl: './poster.component.html',
    styleUrls: ['./poster.component.less']
})
export class PosterComponent {
    public data: any[] = [
        // {
        //     image: "https://img2.akspic.ru/attachments/crops/2/4/0/2/52042/52042-festival-sobytie-koncert-not_in_this_lifetime_tour-appetite_for_destruction-1920x1080.jpg",
        //     date: "29 сентября, 17:00, 2 часа",
        //     location: "Самара",
        //     place: "Ново-Садовая, 3, Самара",
        //     title: "Название мероприятия"
        // },
        // {
        //     image: "https://img2.akspic.ru/attachments/crops/2/4/0/2/52042/52042-festival-sobytie-koncert-not_in_this_lifetime_tour-appetite_for_destruction-1920x1080.jpg",
        //     date: "29 сентября, 17:00, 2 часа",
        //     location: "Самара",
        //     place: "Ново-Садовая, 3, Самара",
        //     title: "Название мероприятия"
        // },
        // {
        //     image: "https://img2.akspic.ru/attachments/crops/2/4/0/2/52042/52042-festival-sobytie-koncert-not_in_this_lifetime_tour-appetite_for_destruction-1920x1080.jpg",
        //     date: "29 сентября, 17:00, 2 часа",
        //     location: "Самара",
        //     place: "Ново-Садовая, 3, Самара",
        //     title: "Название мероприятия"
        // },
        // {
        //     image: "https://img2.akspic.ru/attachments/crops/2/4/0/2/52042/52042-festival-sobytie-koncert-not_in_this_lifetime_tour-appetite_for_destruction-1920x1080.jpg",
        //     date: "29 сентября, 17:00, 2 часа",
        //     location: "Самара",
        //     place: "Ново-Садовая, 3, Самара",
        //     title: "Название мероприятия"
        // },
        // {
        //     image: "https://img2.akspic.ru/attachments/crops/2/4/0/2/52042/52042-festival-sobytie-koncert-not_in_this_lifetime_tour-appetite_for_destruction-1920x1080.jpg",
        //     date: "29 сентября, 17:00, 2 часа",
        //     location: "Самара",
        //     place: "Ново-Садовая, 3, Самара",
        //     title: "Название мероприятия"
        // },
        // {
        //     image: "https://img2.akspic.ru/attachments/crops/2/4/0/2/52042/52042-festival-sobytie-koncert-not_in_this_lifetime_tour-appetite_for_destruction-1920x1080.jpg",
        //     date: "29 сентября, 17:00, 2 часа",
        //     location: "Самара",
        //     place: "Ново-Садовая, 3, Самара",
        //     title: "Название мероприятия"
        // }
    ];

    appendData(){
      let newData = this.data;
      this.data = this.data.concat(newData);
    }
}
