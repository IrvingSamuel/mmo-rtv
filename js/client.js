/**
 * Created by Jerome on 03-03-17.
 */

var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.verifyPlayers = function(){
    Client.socket.emit('verify');
};

Client.askNewPlayer = function(sprite){
    console.log('asking...');
    Client.socket.emit('newplayer',sprite);
};

Client.sendClick = function(x,y,movement){
    Client.socket.emit('click',{x:x,y:y,movement:movement});
};

Client.sendBullet = function(x,y,signal,direction,id){
    Client.socket.emit('shot',{x:x,y:y,signal:signal,direction:direction,id:id});
};
Client.sendRoll = function(data){
    Client.socket.emit('roll',data);
};

Client.reach = function(id){
    Client.socket.emit('reach',id);
};
Client.socket.on('allplayers',function(data,client){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y,client,data[i].sprite);
    }

    Client.socket.on('move',function(data,movement){
        Game.movePlayer(data.id,data.x,data.y,movement);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
});

Client.socket.on('generateShot',function(data){
    Game.addNewBullet(data.x,data.y,data.signal,data.direction,data.id);

    Client.socket.on('moveBullet',function(data,movement){
        Game.movePlayer(data.id,data.x,data.y,movement);
    });
    Client.socket.on('removeBullet',function(id){
        Game.removeBullet(id);
    });
});

Client.socket.on('generateRoll',function(data){
    Game.addNewRoll(data);
});

Client.socket.on('refreshplayers',function(data, client){
    for(var i = 0; i < data.length; i++){
        Game.resetPlayers(data[i].id,data[i].x,data[i].y, client, data[i].sprite);
    }
});


