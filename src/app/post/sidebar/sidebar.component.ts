import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  searchTerm: string;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  onSearch() {
    this.searchService.newSearch.next(this.searchTerm);
  }

}
