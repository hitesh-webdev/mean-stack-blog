import { Subject } from 'rxjs/Subject';

export class SearchService {
    newSearch = new Subject<string>();
}
