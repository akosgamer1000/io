import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import {quotes} from './js';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  @Get('hatterszin')
  @Render('hatter')
  háttérszin(@Query('bgcolor') bgcolor:string='blue')
  {
      return{ bgcolor};
  }
  
  //határ
  @Get("lista")
  @Render('index2')
  getLista(){
    return{ quotes}
  }
  @Get("random")
  @Render('index3')
  getrandom()
  {

    let szam:number= Math.floor(Math.random() * (quotes.length-1 - 0 + 1) + 0);
    return{
       quotes: quotes[szam]
    }
  }
  @Get("hires")
  @Render('index4')
  gethires(){
    let mymap=new Map<string,number>()
    for(let h of quotes){
      if(mymap.has(h.author)){
        mymap.set(h.author,mymap.get(h.author).valueOf()+1)
      }
      else{
        mymap.set(h.author,1);
      }
    }
    return{mymap}
  }
  @Get('quotes/:id')
  @Render("index5")
  oneQuote(@Param('id') id: string) {
    return{ quotes:quotes[Number.parseInt( id)-1]}
  }
 
  @Get('delete/:id')
  deletebased(@Param('id') id: string){
      try{
        
        delete quotes[Number.parseInt(id)-1]
        return {message:"sikerült"}
      }
      catch{
        return {message:"nem sikerült"}
      }
        
  }
      
    
    
  
    
}
