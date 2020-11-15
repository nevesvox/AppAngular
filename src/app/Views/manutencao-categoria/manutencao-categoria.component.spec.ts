import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoCategoriaComponent } from './manutencao-categoria.component';

describe('ManutencaoCategoriaComponent', () => {
  let component: ManutencaoCategoriaComponent;
  let fixture: ComponentFixture<ManutencaoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutencaoCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencaoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
