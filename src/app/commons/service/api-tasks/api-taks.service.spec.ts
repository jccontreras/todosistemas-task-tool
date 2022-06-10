import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiTaksService } from './api-taks.service';

describe('ApiTaksService', () => {
  let service: ApiTaksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ApiTaksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
