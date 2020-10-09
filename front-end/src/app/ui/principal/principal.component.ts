import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  public nome: String = 'AGORA VAI' //Nesse caso como é público não precisa colocar o public

  constructor() { }

  ngOnInit(): void {
  }

}
