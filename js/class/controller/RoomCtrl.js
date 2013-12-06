/**
 * Created by 黄世凡 on 13-12-5.
 */
function RoomCtrl(room)
{
    this.room = room;

    //连接上
    var connectedRef = new Firebase(Constant.FIREBASE_URL + ".info/connected");
    //当前用户的连接s
    var myConnectionsRef = new Firebase(Constant.FIREBASE_URL + "messages/" + this.room + "/users/" + Constant.USER.id + "/connections");
    connectedRef.on("value", function(snapshot)
    {
        console.log("connected");
        if(snapshot.val())
        {
            var con = myConnectionsRef.push(Constant.USER.email);
            //离开删除连接
            con.onDisconnect().remove();
        }
    });

    var roomUsersRef = new Firebase(Constant.FIREBASE_URL + "/messages/" + room + "/users/");
    this.listUsers = function()
    {
        roomUsersRef.on("value", function(snapshot)
        {
            var name = snapshot.name(), value = snapshot.val();
            console.log("listUsers: " + JSON.stringify(value));
            var lis = "";
            for(name in value)
            {
                for(name2 in value[name])
                {
                    for(name3 in value[name][name2])
                    {
                        lis += "<li>" + value[name][name2][name3] + "</li>";
                        break;
                    }
                }

            }
            document.getElementById("users").innerHTML = lis;
        });
    }

    var roomMessagesRef = new Firebase(Constant.FIREBASE_URL + "/messages/" + room + "/contents");
    this.listMessages = function()
    {
        roomMessagesRef.on("child_added", function(snapshot)
        {
            var name = snapshot.name(), value = snapshot.val();
            console.log("listMessages: " + JSON.stringify(value));
            var container = document.getElementById("message");
            if(!value) return;
            var div = document.createElement("div");
            div.innerHTML = "<em>" + value.email + ": </em>" + value.text;
            container.appendChild(div);

            //右边框(信息边框)
            var right = document.getElementById("right");
            right.scrollTop = right.scrollHeight;
        });
    }

    var messagesRef = new Firebase(Constant.FIREBASE_URL + "messages/" + room + "/contents/");
    this.sendMessage = function()
    {
        var textElemnt = document.getElementById("text");
        var text = textElemnt.value;
        if(!text || ""==text) return;
        var msg = messagesRef.push();
        msg.setWithPriority({email:Constant.USER.email, text:text}, new Date().getDate(), function(error)
        {
            if(error)
            {
                alert(error);
            }
        });
        textElemnt.value = "";
    }
}