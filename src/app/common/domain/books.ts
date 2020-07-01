export class Book {

    constructor(
      public id:number,
      public name:string,
      public rating:number,
      public desc:string,
      public categories:Array<string>
    ) {
  
    }
  }
  