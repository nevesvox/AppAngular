import { Categoria } from 'src/app/Models/Categoria';
import { CategoriaService } from './../../Services/categoria-service/categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { catchError } from 'rxjs/operators';
import { empty, Observable } from 'rxjs';

@Component({
  selector: 'app-manutencao-categoria',
  templateUrl: './manutencao-categoria.component.html',
  styleUrls: ['./manutencao-categoria.component.scss']
})
export class ManutencaoCategoriaComponent implements OnInit {
  // Formulário
  formCategoria: FormGroup;
  submitted = false;
  // Categoria selecionada Alteração
  idCatedoria: string;
  nomeCategoria: string;
  descricaoCategoria: string;
  // Controle de tela
  telaAlteracao: boolean = false;
  tituloExibido: string = 'Nova Categoria';
  carregando: boolean = false;

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  };

  categorias = [];
  
  constructor(
    private alertService: AlertModalService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Cria o formulário
    this.formCategoria = this.fb.group({
      // Cria os campos do formulário
      nomeCategoria: [null, [Validators.required, Validators.maxLength(100)]],
      descricaoCategoria: [null, [Validators.required, Validators.maxLength(100)]]
    });

    // Busca as categorias
    this.buscaCategorias();

  }

  buscaCategorias() {
    this.categoriaService.buscaCategorias()
    .subscribe(dados => {
      this.categorias = dados
      console.log(this.categorias);
    });
  }

  salvaCategoria() {
    // Altera a váriavel de controle
    this.submitted = true;

    // Verifica a validação do formulário
    if (this.formCategoria.valid) {
      // Exibe spinner
      this.carregando = true;
      // Atualiza o model
      this.categoria.nome = this.formCategoria.value.nomeCategoria;
      this.categoria.descricao = this.formCategoria.value.descricaoCategoria;
      // Faz a requisição
      this.categoriaService.novaCategoria(this.categoria)
        .subscribe(
          success => {
            if (success['tipo'] == 'ok') {
              // Limpa o formulário
              this.cancelaRegistro();
              // Exibe o alerta
              this.alertService.showAlertSuccess('Categoria salva com sucesso!');
            } else {
              // Exibe o alerta
              this.alertService.showAlertDanger('Não foi possivel salvar a Categoria, tente novamente!');
            }
          },
          error => {
            console.error(error);
            // Exibe o alerta
            this.alertService.showAlertDanger('Não foi possivel salvar a Categoria, tente novamente!');
          },
          () => {
            // Atualiza as váriaveis
            this.carregando = false;
            // Atualiza a lista de categorias
            this.buscaCategorias();
          }
        );
    }
    // Exibe o alerta
    // this.alertService.showAlertSuccess('teste menssagem');
  }

  cancelaRegistro() {
    this.submitted = false;
    // Limpa o formulário
    this.formCategoria.reset();
    // Atualiza a tela
    this.telaAlteracao = false;
    this.tituloExibido = 'Nova Categoria';
  }

  // Função responsável pela válidação do campo do formulário
  possuiErro(field: string) {
    return this.formCategoria.get(field).errors;
  }

  editarCategoria(categoria) {
    // Altera o modo da tela
    this.telaAlteracao = true;
    this.tituloExibido = 'Editar Categoria';
    // Recupera a categoria selecionada
    this.idCatedoria = categoria.ID;
    this.nomeCategoria = categoria.NOME;
    this.descricaoCategoria = categoria.DESCRICAO;
    console.log(categoria)
  }

  salvaAlteracoesCategoria() {
    // Altera a váriavel de controle
    this.submitted = true;

    // Verifica a validação do formulário
    if (this.formCategoria.valid) {
      // Exibe spinner
      this.carregando = true;
      // Atualiza o model
      this.categoria.id = this.idCatedoria;
      this.categoria.nome = this.formCategoria.value.nomeCategoria;
      this.categoria.descricao = this.formCategoria.value.descricaoCategoria;

      console.log(this.categoria);
      // Faz a requisição
      this.categoriaService.atualizaCategoria(this.categoria)
        .subscribe(
          success => {
            if (success['tipo'] == 'ok') {
              // Limpa o formulário
              this.cancelaRegistro();
              // Exibe o alerta
              this.alertService.showAlertSuccess('Categoria atualizada com sucesso!');
            } else {
              // Exibe o alerta
              this.alertService.showAlertDanger('Não foi possivel atualizar a Categoria, tente novamente!');
            }
          },
          error => {
            console.error(error);
            // Exibe o alerta
            this.alertService.showAlertDanger('Não foi possivel atualizar a Categoria, tente novamente!');
          },
          () => {
            // Atualiza as váriaveis
            this.carregando = false;
            // Atualiza a lista de categorias
            this.buscaCategorias();
          }
        );
    }
  }

}
