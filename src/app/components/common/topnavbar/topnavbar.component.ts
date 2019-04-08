import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { DataService } from 'src/app/services/data.service';
declare var jQuery: any;

@Component({
    selector: 'app-topnavbar',
    styleUrls: ['./topnavbar.css'],
    templateUrl: 'topnavbar.template.html'
})
export class TopnavbarComponent {
    searchText: string;

    constructor(
        private dataService:DataService
    ) {}

    toggleNavigation(): void {
        jQuery('body').toggleClass('mini-navbar');
        smoothlyMenu();
    }



    onEnter(question) {
    }

}
