import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManutencaoProdutosComponent } from './Views/manutencao-produtos/manutencao-produtos.component';
import { ManutencaoCategoriaComponent } from './Views/manutencao-categoria/manutencao-categoria.component';
import { ProdutosComponent } from './Views/produtos/produtos.component';

const routes: Routes = [
  {path: 'manutencaoProdutos', component: ManutencaoProdutosComponent},
  {path: 'manutencaoCategoria', component: ManutencaoCategoriaComponent},
  {path: 'produtos', component: ProdutosComponent},
  // Default
  { path: '', pathMatch: 'full', redirectTo: 'produtos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
