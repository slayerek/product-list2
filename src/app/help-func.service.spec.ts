import { TestBed } from '@angular/core/testing';

import { HelpFuncService } from './help-func.service';

describe('HelpFuncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelpFuncService = TestBed.get(HelpFuncService);
    expect(service).toBeTruthy();
  });
});
