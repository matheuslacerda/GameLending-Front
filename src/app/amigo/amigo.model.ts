import type { EntityDto } from '@abp/ng.core';
import { Jogo } from '../jogo/jogo.model';

export interface Amigo extends EntityDto<string> {
    nome: string;
    jogos: Jogo[];
}
