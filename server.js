const cluster=require('cluster')

// by using os module ,we can get the no of cpu core avialbel
const os=require('os')

const totalCpus=os.cpus().length;
// console.log(totalCpus)it give cpus , like 8 core cpu

// 
if(cluster.isPrimary){

    // it create fork work 
    for (let i=0;i<totalCpus;i++){
        cluster.fork()
    }
}
else{
    const app=express();
    app.get('/',(req,res)=>{
        return res.json({msg :`heelo from express server ${process.pid}`})
    })

    app.listen(300,()=>console.log('server stared '))
}