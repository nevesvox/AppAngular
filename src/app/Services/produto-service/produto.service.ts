import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = environment.API;

  constructor(
    private http: HttpClient
  ) { }

  listaProdutos() {
    return this.http.get(`${this.API}produtos`)
      .pipe(
        //delay(2000),
        tap(console.log)
      );
  }

  novoProduto(produto) {
    return this.http.post(`${this.API}novoProduto`,
      produto)
      .pipe(
        take(1)
      );
  }

  atualizaProduto(produto) {
    return this.http.post(`${this.API}atualizaProduto`,
      produto)
      .pipe(
        take(1)
      );
  }

  procuraProduto(produto, valorMaximo, valorMinimo) {
    let par_pesquisa = {
      pesquisa: produto,
      valorMaximo: valorMaximo == 0 ? null : valorMaximo,
      valorMinimo: valorMinimo == 0 ? null : valorMinimo
    };
  
    return this.http.post(`${this.API}procuraProduto`,
      par_pesquisa)
      .pipe(
        //delay(2000),
        tap(console.log)
      );
  }

  excluiProduto(idProduto) {
    let par_pesquisa = {
      idProduto: idProduto,
    };
  
    return this.http.post(`${this.API}excluiProduto`,
      par_pesquisa)
      .pipe(
        //delay(2000),
        tap(console.log)
      );
  }

}
