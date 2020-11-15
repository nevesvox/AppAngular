import { CategoriaService } from './../../Services/categoria-service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { empty, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProdutoService } from './../../Services/produto-service/produto.service';
import { AlertModalService } from './../../shared/alert-modal.service';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  // Inicializa as váriavies necessárias
  dados = [];
  categorias = [];
  valorMaximo: number = 0;
  valorMinimo: number = 0;
  pesquisaProduto: string = '';
  produtos$: Observable<[]>;

  // produtos = [];

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private alertService: AlertModalService,
    private router: Router
  ) { }


  ngOnInit(): void {
    // Realiza a busca dos produtos cadastrados
    this.produtos$ = this.produtoService.listaProdutos()
      .pipe(
        catchError(error => {
          console.log(error);
          return empty();
        })
      );

    // Busca as categorias
    this.buscaCategorias();
  }

  isEmptyObject(obj) {
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  }

  /** 
   * Função responsável por buscar as Categorias
  */
  buscaCategorias() {
    // Realiza a busca de Categorias
    this.categoriaService.buscaCategorias()
      .subscribe(dados => {
        // Atualiza as categorias
        this.categorias = dados
      });
  }

  hendlerError() {
    // Exibe o alerta
    this.alertService.showAlertSuccess('teste menssagem');
  }

  /** 
   * Função responsável pela procura de Produtos com os Filtros (Campo de procura e campo de valores)
  */
  procuraProduto() {
    // Realiza a requisição e atualiza o Observable
    this.produtos$ = this.produtoService.procuraProduto(this.pesquisaProduto, this.valorMaximo, this.valorMinimo)
      .pipe(
        catchError(error => {
          console.log(error);
          return empty();
        })
      );
  }

  /** 
   * Função responsável por chamar e passar os dados para a página de Manutenção de Produto
  */
  alterarProduto(produto) {
    // Chama a página de manutenção passando os valores por queryParams
    this.router.navigate(['/manutencaoProdutos'],
      {
        queryParams: {
          id: produto.idProduto,
          idCategoria: produto.categoriaId,
          nome: produto.nomeProduto,
          descricao: produto.descricaoProduto,
          valor: produto.valorProduto,
          estoque: produto.estoqueProduto
        }
      });
  }

  /** 
   * Função responsável por buscar a Categoria selecionada passando os filtros de valores
  */
  buscaCategoriaSelecionada(categoria) {
    console.log(Observable.prototype);
    // Realiza a requisição e atualiza a váriavel com o retorno
    this.produtos$ = this.categoriaService.procuraCategoria(categoria.ID, this.valorMaximo, this.valorMinimo)
      .pipe(
        catchError(error => {
          console.log(error);
          return empty();
        })
      );
  }

  /** 
   * Função responsável por limpar os valores
  */
  limpaValores() {
    // Zera os valores
    this.valorMaximo = 0;
    this.valorMinimo = 0;
  }

  formataValor(valor) {
    console.log(valor.toLocaleString('pt-br'));
    return valor.toLocaleString('pt-br');
  }

}
