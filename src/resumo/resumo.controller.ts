import { Controller, Get } from '@nestjs/common';
import { ResumoService } from './resumo.service';
import { Resumo } from 'src/dto/resumo.dto';

@Controller('resumo')
export class ResumoController {
  constructor(private readonly resumoService: ResumoService) {}

 @Get()
  findAll(): Resumo[] {
    const resumo: Resumo = {
      receita: {
        totalRecebida: 100,
        totalReceber: 200,
        totalEmily: 300,
        totalMatheus: 400,
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
