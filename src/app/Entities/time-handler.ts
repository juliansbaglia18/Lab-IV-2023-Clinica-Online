export class TimeHandler {
    
    public static toString(num : number) : string{
        let aux = num.toString().padStart(4,'0');
        return [aux.slice(0, 2), ':', aux.slice(2)].join('');
    }

    public static toNumber(time : string) : number{
        return Number([time.slice(0,2),time.slice(3)].join(''));
    }

    public static addTime(time : number, minutes : number) : number{
        let newTime = time + minutes;
        //adjust minutes to fit hour format
        if(newTime  % 100 >= 60 || newTime % 100 < minutes){
            newTime += 40;
        }
        return newTime;
    }

    public static substractTime(time : number, minutes : number) : number{
        let newTime = time - minutes;
        if(time % 100 < minutes){
            newTime -= 40;
        }
        return newTime;
    }

    public static addDays(date : Date, days : number) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    public static daysAreEqual(desc1 : string, desc2 : string) : boolean{
        return desc1.toLowerCase() == desc2.toLowerCase() 
        || desc1.toLocaleLowerCase() == 'miercoles' && desc2.toLowerCase() == 'miércoles'
        || desc2.toLocaleLowerCase() == 'miercoles' && desc1.toLowerCase() == 'miércoles'
        || desc1.toLocaleLowerCase() == 'sabado' && desc2.toLowerCase() == 'sábado'
        || desc2.toLocaleLowerCase() == 'sabado' && desc1.toLowerCase() == 'sábado'
    }

    public static getDayDescription(date : Date){
        return date.toLocaleString('es-es',{ weekday : 'long'});
    }

    public static formatDate(date : Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('-');
    }

    //returns 1 if a > b
    public static compareDates(a : { fecha : string, inicia : string}, b : { fecha : string, inicia : string}) : number{
        return this.toDate(a) > this.toDate(b) ? 1 : -1;
    }

    public static deconstructDate(date : { fecha : string, inicia : string}){
        return [...date.fecha.split('-'), ...date.inicia.split(':')];
    }
    
    public static toDate(date : { fecha : string, inicia : string}) : Date{
        let parts = this.deconstructDate(date);
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]), parseInt(parts[3]), parseInt(parts[4]));
    }

    public static reverseDateString(date : string) : string{
        let [day, month, year] = date.split('-');
        return  [year, month, day].join('-');
    }
}