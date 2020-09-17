import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { Jogo } from './jogo.model';

@Injectable({
  providedIn: 'root',
})
export class JogoService {
  apiName = 'Default';

  create = (input: Jogo) =>
    this.restService.request<any, Jogo>({
      method: 'POST',
      url: `/api/app/jogo`,
      body: input,
    },
    { apiName: this.apiName })

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/jogo/${id}`,
    },
    { apiName: this.apiName })

  get = (id: string) =>
    this.restService.request<any, Jogo>({
      method: 'GET',
      url: `/api/app/jogo/${id}`,
    },
    { apiName: this.apiName })

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<Jogo>>({
      method: 'GET',
      url: `/api/app/jogo`,
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName })

  update = (id: string, input: Jogo) =>
    this.restService.request<any, Jogo>({
      method: 'PUT',
      url: `/api/app/jogo/${id}`,
      body: input,
    },
    { apiName: this.apiName })

  constructor(private restService: RestService) {}
}
