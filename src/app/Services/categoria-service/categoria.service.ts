import { Injectable } from '@angular/core';
import axios from "axios";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly API = environment.API;

  constructor(
    private http: HttpClient
  ) { }
  
  /** 
   * Função reponsável por buscar todas as Categorias salvas
  */
  buscaCategorias() {
    // Realiza a requisição GET
    return this.http.get(`${this.API}categorias`)
      .pipe(
        //delay(2000),
        tap(console.log)
      );
  }

  /** 
   * Função reponsável por salvar uma nova Categoria
  */
  novaCategoria(categoria) {
    // Realiza a requisição POST passando os dados
    return this.http.post(`${this.API}insereCategoria`,
      categoria)
      .pipe(
        take(1)
      );
  }

  /** 
   * Função reponsável por atualizar a Categoria
  */
  atualizaCategoria(categoria) {
    // Realiza a requisição POST passando os dados
    return this.http.post(`${this.API}atualizaCategoria`,
      categoria)
      .pipe(
        take(1)
      );
  }

  /** 
   * Função reponsável por realiza a busca da Categoria com os filtros de Valores
  */
  procuraCategoria(idCategoria, valorMinimo, valorMaximo) {
    // Prepara os dados
    let par_pesquisa = {
      idCategoria: idCategoria,
      valorMaximo: valorMaximo == 0 ? null : valorMaximo,
      valorMinimo: valorMinimo == 0 ? null : valorMinimo
    };
    
    // Realiza a requisição POST passando os dados
    return this.http.post(`${this.API}procuraCategoria`,
      par_pesquisa)
      .pipe(
        //delay(2000),
        tap(console.log)
      );
  }
}
