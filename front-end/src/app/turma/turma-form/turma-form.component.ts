import { CursoService } from './../../curso/curso.service';
import { CursoFormComponent } from './../../curso/curso-form/curso-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TurmaService } from './../turma.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {​​​​ Location }​​​​ from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProfessorService } from 'src/app/professor/professor.service';
import { SalaAulaService } from 'src/app/sala-aula/sala-aula.service';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.scss']
})
export class TurmaFormComponent implements OnInit {

  // Variável para armazenar os dados do registro
  turma : any = {}  // Objeto vazio, nome no SINGULAR

  title : string = 'Nova turma'

  //variáveis para armazenar as listagens de objetos relacionados
  cursos : any = [] //vetor vazio, nome PLURAL
  professores : any = []
  salasAula : any = []

  niveis : any = [
    { valor: 'Básico' },
    { valor: 'Intermediário' },
    { valor: 'Avançado' }
  ]

  constructor(
      private turmaSrv : TurmaService,
      //Services das entidades relacionadas
      private cursoSrv : CursoService,
      private professorSrv : ProfessorService,
      private salaAulaSrv : SalaAulaService,
      private snackBar : MatSnackBar,
      private location : Location,
      private actRoute : ActivatedRoute
  ) { }

 async ngOnInit(){
      //Verifica se existe o parâmetro id na URL (rota)
      if(this.actRoute.snapshot.params['id']){
          //1) Acionar o back-end para buscar esse registro
          // e disponibilizá-lo para edição
          try {
            this.turma = await this.turmaSrv.obterUm(this.actRoute.snapshot.params['id'])
            //2) Mudar o título da página
            this.title = 'Editando turma'
          }
          catch(erro) {
              console.log(erro)
              this.snackBar.open('ERRO: não foi possível carregar os dados para edição.', 'Que pena!', 
              { duration: 5000})
        
          }
      }
      this.carregarDados()
  }

  async carregarDados(){
      try{
        this.cursos = await this.cursoSrv.listar()
        this.professores = await this.professorSrv.listar()
        this.salasAula = await this.salaAulaSrv.listar()
      }
      catch(erro){
          console.log(erro)
          this.snackBar.open('ERRO: Não foi possível carregar todos os dados necessários para a página', 'Que pena', { duration: 5000})
      }
  }

 async salvar(form: NgForm){
    if(form.valid){
        try{
        //Se o turma já existir (caso de edição), ele já terá
        //o atributo _id
        if(this.turma._id) {
            await this.turmaSrv.atualizar(this.turma)//Atualização
            
        }
        else {
            await this.turmaSrv.novo(this.turma)
        }
        //1) Salvar os dados no back-end
        await this.turmaSrv.novo(this.turma)
        //2) Dar o feedback para o usuário
        this.snackBar.open('Dados salvos com sucesso.', 'Entendi', 
        { duration: 5000 })
        //3) Voltar ao componente de listagem
        this.location.back()
        }
        catch (erro){
            console.log(erro)
            this.snackBar.open('Erro: não foi possível salvar os dados.', 'Que pena!',
            { duration: 5000 })
        }
    }
  }

  voltar(form: NgForm){
      let result = true
        //form.dirty = formulário "sujo", não salvo (via código)
        //form.touched = o conteúdo de algum campo foi alterado (via usuário)

      if(form.dirty && form.touched){
        result = confirm('Há dados não salvos. Deseja realmente voltar?')

      }

      if(result) this.location.back()

  }

}