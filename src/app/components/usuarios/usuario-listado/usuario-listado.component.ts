import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/Entities/user';

@Component({
  selector: 'app-usuario-listado',
  templateUrl: './usuario-listado.component.html',
  styleUrls: ['./usuario-listado.component.scss']
})
export class UsuarioListadoComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() usuarios? : User[];
  @Input() filterValue? : string;
  @Input() displayedColumns? : string[];

  @Output() usuarioSeleccionadoEvent = new EventEmitter<User>

  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  
  dataSource! : MatTableDataSource<User>;
  selectedRowIndex : any;

  constructor() { }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource (this.usuarios);
    this.sort.sort(({id: 'nombre', start: 'asc'}) as MatSortable)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["usuarios"] && !changes["usuarios"].isFirstChange()){
      this.dataSource.data = this.usuarios!;
    }
    if(changes["filterValue"] && !changes["filterValue"].isFirstChange()){
      this.dataSource.filter = this.filterValue!.trim().toLowerCase();
    }      
  }

  onUsuarioSeleccionado(row : User){
    this.selectedRowIndex = row.uid;
    this.usuarioSeleccionadoEvent.emit(row);
  }
}

