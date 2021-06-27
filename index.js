const Websocket=require('ws')
const wss=new Websocket.Server({
    port:9876
},()=>{
    console.log('server running on port 9876')
})


//wss.clients for all the clients 


wss.on('connection',(ws)=>{
    ws.on('message',(data)=>{
        wss.clients.forEach(function each(client){
            if(client.readyState===Websocket.OPEN){
                client.send(data)
            }
        })
    })
})

