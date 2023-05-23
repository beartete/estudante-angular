import { Component, OnInit } from '@angular/core';
import { Estudante } from '../estudante';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstudantesService } from '../estudantes.service';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class EstudantesComponent implements OnInit{

  estudantes: Estudante[] = [];
  formGroup: FormGroup;
  constructor (private service: EstudantesService,
              private builder: FormBuilder)
              {
                this.formGroup = builder.group({
                  id: [''],
                  name: [''],
                  email: [''],
                  telefone: [''],
                  data_nasc: [''],
                  ra: ['']
                });
              }
  ngOnInit(): void{
    this.loadClients();
  }

  loadClients() {
    this.service.getEstudantes().subscribe(
      {
        next: data => this.estudantes = data,
        error: (error) => console.log("Erro ao chamar o endpoint "+ error)
      }
    )
  }


  save(){
    this.service.save(this.formGroup.value).subscribe(
      {
        next: data => {
            this.estudantes.push(data);
            this.formGroup.reset();
        },
      }
    )
  }

}