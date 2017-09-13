import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.searchService.newSearch.subscribe(
      (searchTerm) => {
        if (searchTerm.trim() !== '') {
          this.router.navigate(['/posts/tags', searchTerm]);
        } else {
          this.router.navigate(['/posts']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
