import { Injectable } from '@angular/core';
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import {merge,mergeWith,assign,size} from 'lodash';

interface Source { 
  (thing:any) : Observable<any>; 
}

@Injectable()
export class InfiniteScrollHandler {

    public offset:number = 0;
    public limit:number = 30;
    public form:any = {};
    public $form:any = new BehaviorSubject<any>({});
    public fetchParameters:any;
    public requireOnFetch:any;
    public source:Source = {} as Source;
    // Components should Observ this
    public subject:Subject<Array<any>> = new BehaviorSubject<Array<any>>([]);
    get $rows(): Observable<Array<any>> {
      return this.subject.asObservable();
    }

    // Used to merge fetched data into complete data list
    public previousSubject:Array<any> = [];

    constructor(){}

    configure(
      source:Source,
      fetchParameters:string,
      require?:any
    ) {
        this.source = source;
        this.fetchParameters = fetchParameters;
        this.requireOnFetch = require;
        return this;
    }

    observe(){
      return this.$rows;
    }

    public observeForm() : Observable<Array<any>> {
      return this.$form.asObservable();
    }

    getSelectedEntries(){
      let _entries = [];
      for( let item in this.form ){
        // if(this.form[item]===true){
          _entries.push(item);
        // }
      }
      return _entries;
    }

    public getForm() : any {
      return this.form;
    }

    public clearFormSelections() : any {
      this.form = {};
      this.$form.next({})

      // Psuedo Promise
      let _then = (callback:any)=>{ callback() }
      return {
        then:_then
      };
    }

    public getFormLength() : any {
      return size(this.form);
    }

    public setFormValue(index:number,id:string,value:boolean):void{
      // Booleans only atm.
      this.form = Object.assign({},this.form,{
        [id]:value
      });
      this.$form.next(this.form);
    }


    public mergeForm(_form:any,forceTrue:boolean = false){
      /* sometime the parent will want to select all of something from an api,
      in this instance the scrollPager does not have all said items,
      so we merge the states of the extras from the parent into the
      pager so we can bulk edit easily after selecting all */
      if(forceTrue){
        this.form = _form;
      }else{
        this.form = merge({},_form,this.form);
      }
      this.$form.next(this.form);
      return this.form;
    }

    fetch() : void {

        let _fetchParameters = this.fetchParameters;
        let _prerequisite  = ''

        if(this.requireOnFetch && _fetchParameters.indexOf(this.requireOnFetch.key)<0){
          _prerequisite = '&'+this.requireOnFetch['key']+'='+this.requireOnFetch['default']
        }

        _fetchParameters = _fetchParameters.concat(_prerequisite);
        _fetchParameters = _fetchParameters.concat('&offset='+this.offset);
        _fetchParameters = _fetchParameters.concat('&limit='+this.limit);

        this.offset += this.limit; // Get the next batch, next time.
        if(this.fetchParameters.indexOf('?') == -1){
          _fetchParameters = _fetchParameters.replace('&','?'); // Need a '?' before subsequent '&' options.
        }
        this.source(_fetchParameters).subscribe((it)=>{
          let _newSubject = [...this.previousSubject, ...it];
          this.subject.next(_newSubject); // Push the list to the observable being watched by our component.
          this.previousSubject = _newSubject; // Append to loaded entires array.
        });
    }

    done():void {
      this.subject.complete();
    }

    wipe(){
      this.previousSubject = []
      this.offset = 0;
    }
}
