'use strict';
let prods={};
let obj={
    addOrUpdate:function (prod) {
        prods[prod.id]=prods[prod.id]?prods[prod.id]+prod.num:prod.num;
        this.save(prods);
    },
    DeleteProd:function (id) {
        //delete prids.id;
        prods.id=null;
        this.save(prods);
    },
    getProds:function(){
        return JSON.parse(localStorage.getItem('prods')||'{}');
    },
    save:function (prods) {
        localStorage.setItem('prods',JSON.stringify(prods));
    },
    getProdsCount:function(){
        let total=0;
        prods=this.getProds();
        return Object.keys(prods).length;
        for(let key in prods){
            total+=prods[key]-0;
        }
        return total;
    }
}
export default obj;
