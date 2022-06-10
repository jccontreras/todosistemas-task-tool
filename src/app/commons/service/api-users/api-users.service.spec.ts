import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiUsersService } from './api-users.service';

describe('ApiUsersService', () => {
  let service: ApiUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ApiUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
