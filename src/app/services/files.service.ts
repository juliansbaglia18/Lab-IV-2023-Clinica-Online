import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private storage: AngularFireStorage) { 

  }

  public uploadFile(fileName: string, data: any,metadata:any) {
    return this.storage.upload(fileName, data, {customMetadata:metadata });
  }

  public getFileRef(fileName: string) {
    return this.storage.ref(fileName).getDownloadURL();
  }
  
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  exportUsersAsExcel(users : any[], pacientes : any[], profesionales : any[], excelFileName: string){
    const wsUsuarios: XLSX.WorkSheet = XLSX.utils.json_to_sheet(users);
    const wsPacientes: XLSX.WorkSheet = XLSX.utils.json_to_sheet(pacientes);
    const wsProfesionales: XLSX.WorkSheet = XLSX.utils.json_to_sheet(profesionales);

    const workbook: XLSX.WorkBook = { Sheets: { 'usuarios': wsUsuarios, 'pacientes' : wsPacientes, 'profesionales' : wsProfesionales}, SheetNames: ['usuarios','pacientes','profesionales'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  exportInformesAsExcelFile(informes : {txe : any[], txd : any[], tpp : any[], tfp : any[], logs : any[]}, excelFileName: string){
    const wsInformes1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(informes.txe);
    const wsInformes2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(informes.txd);
    const wsInformes3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(informes.tpp);
    const wsInformes4: XLSX.WorkSheet = XLSX.utils.json_to_sheet(informes.tfp);
    const wsInformes5: XLSX.WorkSheet = XLSX.utils.json_to_sheet(informes.logs);

    const workbook: XLSX.WorkBook = { Sheets: { 'especialidades': wsInformes1, 'dias' : wsInformes2, 'pendientes' : wsInformes3, 'finalizados' : wsInformes4, 'logs' : wsInformes5}, SheetNames: ['especialidades','dias','pendientes', 'finalizados', 'logs']};
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }
}
