import { CategoriaService } from './../../Services/categoria-service/categoria.service';
import { ProdutoService } from './../../Services/produto-service/produto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from 'src/app/Models/Produto';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manutencao-produtos',
  templateUrl: './manutencao-produtos.component.html',
  styleUrls: ['./manutencao-produtos.component.scss']
})
export class ManutencaoProdutosComponent implements OnInit {

  // Formulário
  formProduto: FormGroup;
  submitted = false;
  carregando: boolean = false;
  valorProduto: number = 0;
  titulo: string = 'Novo Produto';
  telaAlteracao: boolean = false;

  categorias = [];

  produto: Produto = {
    id: '',
    idCategoria: '',
    nome: '',
    descricao: '',
    valor: 0,
    estoque: 0
  };

  produtoAlteracao: Produto = {
    id: '',
    idCategoria: '',
    nome: '',
    descricao: '',
    valor: 0,
    estoque: 0
  };

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private alertService: AlertModalService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Cria o formulário
    this.formProduto = this.fb.group({
      // Cria os campos do formulário
      nomeProduto: [null, [Validators.required, Validators.maxLength(100)]],
      descricaoProduto: [null, [Validators.required, Validators.maxLength(100)]],
      valorProduto: [null, [Validators.required]],
      estoqueProduto: [null, [Validators.required, Validators.min(0)]],
      selectCategoria: [null, [Validators.required]]
    });

    // Busca as categorias
    this.categoriaService.buscaCategorias()
      .subscribe(dados => {
        this.categorias = dados
        console.log(this.categorias);
      });
    
    // Recupera os dados passados pelo queryParams
    this.route.queryParams.subscribe(
      (params: any) => {
        // Verifica se o objeto está vazio
        const contador = Object.entries(params).length;
        if (contador !== 0) {
          // Atualiza a tela
          this.titulo = 'Atualizar Produto';
          this.telaAlteracao = true;

          //Recupera os dados
          this.produtoAlteracao.id = params.id;
          this.produtoAlteracao.idCategoria = params.idCategoria;
          this.produtoAlteracao.nome = params.nome;
          this.produtoAlteracao.descricao = params.descricao;
          this.valorProduto = params.valor;
          this.produtoAlteracao.estoque = params.estoque;
        }
      }
    );
  }

  /**
   * Função responsável por Salvar um novo Produto
   */
  salvarProduto() {
    // Altera a váriavel de controle
    this.submitted = true;
    // Verifica a validação do formulário
    if (this.formProduto.valid) {
      // Exibe spinner
      this.carregando = true;
      // Atualiza o model
      this.produto.nome = this.formProduto.value.nomeProduto;
      this.produto.descricao = this.formProduto.value.descricaoProduto;
      this.produto.valor = this.formProduto.value.valorProduto;
      this.produto.estoque = this.formProduto.value.estoqueProduto;
      this.produto.idCategoria = this.formProduto.value.selectCategoria;

      // Faz a requisição
      this.produtoService.novoProduto(this.produto)
        .subscribe(
          success => {
            if (success['tipo'] == 'ok') {
              // Limpa o formulário
              this.cancelaAcao();
              // Exibe o alerta
              this.alertService.showAlertSuccess('Produto salvo com sucesso!');
            } else {
              // Exibe o alerta
              this.alertService.showAlertDanger('Não foi possivel salvar o Produto, tente novamente!');
            }
          },
          error => {
            console.error(error);
            // Exibe o alerta
            this.alertService.showAlertDanger('Não foi possivel salvar o Produto, tente novamente!');
          },
          () => {
            // Atualiza as váriaveis
            this.carregando = false;
          }
        );
    }
  }

  /**
   * Função responsável pela válidação do campo do formulário
   */
  possuiErro(field: string) {
    return this.formProduto.get(field).errors;
  }
  
  /**
   * Função reponsável por Cancelar/ Limpar o formulário
   */
  cancelaAcao() {
    if (this.telaAlteracao == true) {
       return this.router.navigate(['/produtos']);
    }
    // Altera a váriavel de controle
    this.submitted = false;
    // Limpa o formulário
    this.formProduto.reset();
  }

  /**
   * Função reponsável por Atualizar os dados de um Produto
   */
  atualizaProduto() {
    // Altera a váriavel de controle
    this.submitted = true;
    // Verifica a validação do formulário
    if (this.formProduto.valid) {
      // Exibe spinner
      this.carregando = true;
      // Atualiza o model
      this.produto.id = this.produtoAlteracao.id;
      this.produto.nome = this.formProduto.value.nomeProduto;
      this.produto.descricao = this.formProduto.value.descricaoProduto;
      this.produto.valor = this.formProduto.value.valorProduto;
      this.produto.estoque = this.formProduto.value.estoqueProduto;
      this.produto.idCategoria = this.formProduto.value.selectCategoria;

      // Faz a requisição
      this.produtoService.atualizaProduto(this.produto)
        .subscribe(
          success => {
            if (success['tipo'] == 'ok') {
              // Limpa o formulário
              this.cancelaAcao();
              // Exibe o alerta
              this.alertService.showAlertSuccess('Produto atualizado com sucesso!');
            } else {
              // Exibe o alerta
              this.alertService.showAlertDanger('Não foi possivel atualizado o Produto, tente novamente!');
            }
          },
          error => {
            console.error(error);
            // Exibe o alerta
            this.alertService.showAlertDanger('Não foi possivel atualizado o Produto, tente novamente!');
          },
          () => {
            // Atualiza as váriaveis
            this.carregando = false;
          }
        );
    }
  }

  /**
   * Função responsável por excluir um Produto
   */
  excluirProduto() {
    // Exclui o produto
    this.produtoService.excluiProduto(this.produtoAlteracao.id)
        .subscribe(
          success => {
            if (success['tipo'] == 'ok') {
              // Limpa o formulário
              this.cancelaAcao();
              // Exibe o alerta
              this.alertService.showAlertSuccess('Produto excluido com sucesso!');
              // Retorna para a página de Produtos
              return this.router.navigate(['/produtos']);
            } else {
              // Exibe o alerta
              this.alertService.showAlertDanger('Não foi possivel excluir o Produto, tente novamente!');
            }
          },
          error => {
            console.error(error);
            // Exibe o alerta
            this.alertService.showAlertDanger('Não foi possivel excluir o Produto, tente novamente!');
          },
          () => {
            // Atualiza as váriaveis
            this.carregando = false;
          }
        );
  }

}
