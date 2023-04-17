import { TestBed } from '@angular/core/testing';

import { ListarEmpresaService } from './listar-empresa.service';

describe('ListarEmpresaService', () => {
  let service: ListarEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
