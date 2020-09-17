import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {Jogo} from './jogo.model';
import {JogoService} from './jogo.service';
import {catchError, finalize} from 'rxjs/operators';

export class JogoDataSource implements DataSource<Jogo> {private jogoSubject = new BehaviorSubject<Jogo[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private jogoService: JogoService) {

    }

    loadJogos(
        filter: string,
        sortDirection: string,
        pageIndex: number,
        pageSize: number) {

        this.loadingSubject.next(true);

        /*this.jogoService.getList(filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(jogo => this.jogoSubject.next(jogo));*/

    }

    connect(collectionViewer: CollectionViewer): Observable<Jogo[]> {
        console.log('Connecting data source');
        return this.jogoSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.jogoSubject.complete();
        this.jogoSubject.complete();
    }
}
