import type { EntityDto } from '@abp/ng.core';
import { Amigo } from '../amigo/amigo.model';

export interface Jogo extends EntityDto<string> {
    nome: string;
    amigoId: string;
    amigo: Amigo;
}
