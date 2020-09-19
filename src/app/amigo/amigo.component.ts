import { ListService, PagedResultDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { AmigoService } from './amigo.service';
import { Amigo } from './amigo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-amigo',
  templateUrl: './amigo.component.html',
  styleUrls: ['./amigo.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class AmigoComponent implements OnInit {
  amigo = { items: [], totalCount: 0 } as PagedResultDto<Amigo>;

  form: FormGroup;

  selectedAmigo = {} as Amigo;

  isModalOpen = false;

  constructor(
    public readonly list: ListService,
    private amigoService: AmigoService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {
  }

  ngOnInit() {
    const amigoStreamCreator = (query) => this.amigoService.getList(query);

    this.list.hookToQuery(amigoStreamCreator).subscribe((response) => {
      this.amigo = response;
    });
  }

  createAmigo() {
    this.selectedAmigo = {} as Amigo;
    this.buildForm();
    this.isModalOpen = true;
  }

  editAmigo(id: string) {
    this.amigoService.get(id).subscribe((amigo) => {
      this.selectedAmigo = amigo;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      nome: [this.selectedAmigo.nome || null, Validators.required]
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedAmigo.id
      ? this.amigoService.update(this.selectedAmigo.id, this.form.value)
      : this.amigoService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', 'AbpAccount::AreYouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.amigoService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
