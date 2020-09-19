import { ListService, PagedResultDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { JogoService } from './jogo.service';
import { Jogo } from './jogo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Amigo } from '../amigo/amigo.model';
import { AmigoService } from '../amigo/amigo.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class JogoComponent implements OnInit {
  jogo = { items: [], totalCount: 0 } as PagedResultDto<Jogo>;

  form: FormGroup;

  selectedJogo = {} as Jogo;

  amigos$: Observable<Amigo[]>;

  isModalOpen = false;

  constructor(
    public readonly list: ListService,
    private jogoService: JogoService,
    private amigoService: AmigoService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {
    const input: PagedAndSortedResultRequestDto = {
      maxResultCount: 1000,
      skipCount: 0,
      sorting: ''
    };
    this.amigos$ = amigoService.getList(input).pipe(map((r) => r.items));
  }

  ngOnInit() {
    const jogoStreamCreator = (query) => this.jogoService.getList(query);

    this.list.hookToQuery(jogoStreamCreator).subscribe((response) => {
      this.jogo = response;
    });
  }

  createJogo() {
    this.selectedJogo = {} as Jogo;
    this.buildForm();
    this.isModalOpen = true;
  }

  editJogo(id: string) {
    this.jogoService.get(id).subscribe((jogo) => {
      this.selectedJogo = jogo;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      nome: [this.selectedJogo.nome || null, Validators.required],
      amigoId: [this.selectedJogo.amigoId || null]
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedJogo.id
      ? this.jogoService.update(this.selectedJogo.id, this.form.value)
      : this.jogoService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', 'AbpAccount::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.jogoService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
