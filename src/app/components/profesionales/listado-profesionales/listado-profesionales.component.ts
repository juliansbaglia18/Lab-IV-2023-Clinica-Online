import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Profesional } from 'src/app/Entities/profesional';

@Component({
  selector: 'app-listado-profesionales',
  templateUrl: './listado-profesionales.component.html',
  styleUrls: ['./listado-profesionales.component.scss']
})
export class ListadoProfesionalesComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() profesionales? : Profesional[];
  @Input() filterValue? : string;
  @Input() displayedColumns? : string[];

  @Output() profesionalSeleccionadoEvent = new EventEmitter<Profesional>

  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  
  dataSource! : MatTableDataSource<Profesional>;
  
  constructor() { }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource (this.profesionales);
    this.sort.sort(({id: 'nombre', start: 'asc'}) as MatSortable)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["profesionales"] && !changes["profesionales"].isFirstChange()){
      this.dataSource.data = this.profesionales!;
    }
    if(changes["filterValue"] && !changes["filterValue"].isFirstChange()){
      this.dataSource.filter = this.filterValue!.trim().toLowerCase();
      this.dataSource.filterPredicate = this.publicFilter;
    }     
  }

  onProfesionalSeleccionado(row : Profesional){
    this.profesionalSeleccionadoEvent.emit(row);
  }

  publicFilter(data : Profesional,filter : string){
    return (
      data.nombre.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1 ||
      data.apellido.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1 ||
      data.especialidadesAsString.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1
    )
  }
}