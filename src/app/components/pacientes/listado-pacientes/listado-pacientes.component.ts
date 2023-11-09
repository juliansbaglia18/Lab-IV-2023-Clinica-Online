import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/Entities/paciente';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() pacientes? : Paciente[];
  @Input() filterValue? : string;
  @Input() displayedColumns? : string[];

  @Output() pacienteSeleccionadoEvent = new EventEmitter<Paciente>

  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  
  dataSource! : MatTableDataSource<Paciente>;
  
  constructor() { }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource (this.pacientes);
    this.sort.sort(({id: 'apellido', start: 'asc'}) as MatSortable)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["pacientes"] && !changes["pacientes"].isFirstChange()){
      this.dataSource.data = this.pacientes!;
    }
    if(changes["filterValue"] && !changes["filterValue"].isFirstChange()){
      this.dataSource.filter = this.filterValue!.trim().toLowerCase();
      this.dataSource.filterPredicate = this.publicFilter;
    }     
  }

  onPacienteSeleccionado(row : Paciente){
    this.pacienteSeleccionadoEvent.emit(row);
  }

  publicFilter(data : Paciente,filter : string){
    return (
      data.nombre.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1 ||
      data.apellido.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1 ||
      data.dni.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1 ||
      data.obraSocial.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1 
    )
  }
}