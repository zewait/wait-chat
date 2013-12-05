/**
 * Created by 黄世凡 on 13-12-5.
 */
function RoomsCtrl()
{
    this.list = function()
    {
        var roomListRef = new Firebase(Constant.FIREBASE_URL + "rooms");
        roomListRef.on("value", function(snapshot)
        {
            var roomsName = snapshot.name(), roomsData = snapshot.val();
            console.log(JSON.stringify(roomsData));
            var roomsDoc = "<ul>";
            for(name in roomsData)
            {
                roomsDoc += "<li><a href='room.html?" + name + "'>" + roomsData[name] + "</a></li>"
            }
            roomsDoc += "</ul>";
            document.getElementById("rooms").innerHTML = roomsDoc;
            return roomsData;
        });
    }
}