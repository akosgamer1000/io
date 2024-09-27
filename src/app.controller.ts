import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import {quotes} from './js';
import { get } from 'http';
import { elementAt } from 'rxjs';
import { query } from 'express';



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
  @Get('search')
  @Render('search')
  keres(@Query('idéz') idéz:string){
    let lista:string[] =[];
    quotes.forEach(element=>{
      if(element.quote.includes(idéz)){
        lista.push(element.quote)
      }
    })
    return{lista}

  }
  @Get('authorRandomForm')
  @Render('form')
  Random(){

  }

  @Get('authorRandom')
  @Render('form2')
  Ran(@Query('szerzo') szerzo:string){
      let lista:string[]=[]
      
      quotes.forEach(element=>{
        if(element.author==szerzo){
          lista.push(element.quote)
         
        }
      })
      let ran=Math.floor(Math.random() * lista.length);
      return{lista:lista[ran]}
  }
  @Get('highligh/:id')
  @Render('highlight')
  High(@Param('id') id:string,@Query('szovegresz') szoveg:string){
    let z="";
    z=quotes[Number.parseInt(id)].quote
    z=z.replace(szoveg,"<b>"+szoveg+"</b>")
    return{z}
  }   
    
    
  
    
}
