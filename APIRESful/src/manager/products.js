const fs = require('fs')

const pathtoproducts =__dirname+ '/../files/products' 

class ProductManager{

       add = async(product)=>{
            if (fs.existsSync(pathtoproducts)) {
             try {
               let data =  await fs.promises.readFile(pathtoproducts,'utf-8')
               let products = JSON.parse(data);
               if(products.length===0){
                    //this is the first product
                    product.id =1;
                    products.push(product);
                    await fs.promises.writeFile(pathtoproducts,JSON.stringify(products,null,2))
                    return{status:"success",message:"added 1 product"}
               }
               product.id = products[products.length-1].id+1;   
               products.push(product);
               await fs.promises.writeFile(pathtoproducts,JSON.stringify(products,null,2));
               return{status:"success",message:"added 1 product"}
             } catch (error) {
                  return {status:"error",error:error}
             }
            }
            else{
                 try {
                    product.id=1;
                    await fs.promises.writeFile(pathtoproducts,JSON.stringify([product],null,2))
                    return{status: "sucess",message:"added 1 product"}
                 } catch (error) {
                      return{status:"error",error:error}
                 }
            }
       }

       getByid = async (id)=>{
          if(!id)return({status: "error",error:"id needed"})
          if(fs.existsSync(pathtoproducts)){
              let data =await fs.promises.readFile(pathtoproducts,'utf-8')
              let products =JSON.parse(data);
              let product = products.find(p=>p.id===id);
              if(product)return{status:"success",payload:product}
              else return {status:"success",message:"No product with that id"}
           }
      }

      putByid = async (id,replace)=>{
          if(!id)return({status: "error",error:"id needed"})
          if(fs.existsSync(pathtoproducts)){
             try {
               let data =await fs.promises.readFile(pathtoproducts,'utf-8')
               let products =JSON.parse(data);
               let product = products.find(p=>p.id===id);
               replace.id = product.id;  
               products[product.id-1]= replace;
               await fs.promises.writeFile(pathtoproducts,JSON.stringify(products,null,2));
               if(product)return{status:"success",payload:products}
               return{status:"success",message:"the id product replaced!!!1"}
             } catch (error) {
               return{status:"error",error:error}
             }
              
           }
      }

      delateById =async (id)=>{
          if(!id)retur({status: "error",error:"id needed"})
          if(fs.existsSync(pathtoproducts)){
             try {
               let data =await fs.promises.readFile(pathtoproducts,'utf-8')
               let products =JSON.parse(data); // array of objets 
               let filterProducts=products.filter(p => p.id!==id)//filter for all objects except this id object
               await fs.promises.writeFile(pathtoproducts,JSON.stringify(filterProducts,null,2))
               return({status:"success",message:"user delated!"})
   
             } catch (error) {
               return{status:"error",error:error} 
             }
          }
      }
       
       get = async()=>{
          if(fs.existsSync(pathtoproducts)){
               try {
                 let data = await fs.promises.readFile(pathtoproducts,'utf-8');
                 let products = JSON.parse(data);
                    return{status:"sucess",payload:products}
               } catch (error) {
                    
               }
          }
          else{
               return{ status:"sucess",payload:[]}
          }

       }
       
}
module.exports= ProductManager;