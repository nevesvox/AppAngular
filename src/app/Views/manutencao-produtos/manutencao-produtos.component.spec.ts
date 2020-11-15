import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoProdutosComponent } from './manutencao-produtos.component';

describe('ManutencaoProdutosComponent', () => {
  let component: ManutencaoProdutosComponent;
  let fixture: ComponentFixture<ManutencaoProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutencaoProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencaoProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
