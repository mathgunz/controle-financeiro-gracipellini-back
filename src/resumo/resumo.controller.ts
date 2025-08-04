import { Controller, Get } from '@nestjs/common';
import { ResumoService } from './resumo.service';
import { Resumo } from 'src/dto/resumo.dto';

@Controller('resumo')
export class ResumoController {
  constructor(private readonly resumoService: ResumoService) {}

 @Get()
  public findAll(): Resumo[] {
    const resumo: Resumo = {
      receita: {
        totalRecebida: 100,
        totalReceber: 200,
        membrosTotal : [{
          nome: 'Emily',
          total: 100
        }, {
          nome: 'Matheus',
          total: 300
        }],
      },
      despesa: {
        totalPagar: 100,
        totalPaga: 200,
        totalPagoEmily: 300,
        totalPagoMatheus: 400,
      },
      saldo: {
        total: 100,
        atual: 300,
      }
    };

    return [resumo];
  }
}
