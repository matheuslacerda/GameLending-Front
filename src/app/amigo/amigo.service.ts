import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { Amigo } from './amigo.model';

@Injectable({
  providedIn: 'root',
})
export class AmigoService {
  apiName = 'Default';

  create = (input: Amigo) =>
    this.restService.request<any, Amigo>({
      method: 'POST',
      url: `/api/app/amigo`,
      body: input,
    },
    { apiName: this.apiName })

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/amigo/${id}`,
    },
    { apiName: this.apiName })

  get = (id: string) =>
    this.restService.request<any, Amigo>({
      method: 'GET',
      url: `/api/app/amigo/${id}`,
    },
    { apiName: this.apiName })

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<Amigo>>({
      method: 'GET',
      url: `/api/app/amigo`,
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName })

  update = (id: string, input: Amigo) =>
    this.restService.request<any, Amigo>({
      method: 'PUT',
      url: `/api/app/amigo/${id}`,
      body: input,
    },
    { apiName: this.apiName })

  constructor(private restService: RestService) {}
}
