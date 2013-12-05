/**
 * 安全控制器
 * Created by 黄世凡 on 13-12-5.
 */
function SecuryCtrl()
{
    var ref = new Firebase(Constant.FIREBASE_URL);
    var auth = new FirebaseSimpleLogin(ref, function(error, user)
    {
        if(error)
        {
            alert(error.code + ": " + error.message);
            if(SecuryCtrl.loginError)
                SecuryCtrl.loginError();
        }else if(user)
        {
            console.log("login success");
            Constant.USER = user;
            console.log("-------------user info begin--------------");
            for(name in user)
            {
                console.log(name + ": " + user[name]);
            }
            console.log("-------------user info end--------------");
            if(SecuryCtrl.loginSuccess)
            {
                SecuryCtrl.loginSuccess();
            }
        }
        else
        {
            if(SecuryCtrl.loginError)
            {
                SecuryCtrl.loginError();
            }
        }
    })

    this.login = function(email, password, rememberMe)
    {
        auth.login("password", {email:email, password:password, rememberMe:rememberMe});
    }

    this.logout = function()
    {
        auth.logout();
        location.href = Constant.LOGIN_URL;
    }

    this.signup = function(email, password)
    {
        auth.createUser(email, password, function(error, user)
        {
           if(error)
           {
               alert("Error: code=" + error.code + ", message=" + error.message);
           }
           else
           {
               auth.login("password", {email:email, password:password, rememberMe:true});
           }
        });
    }

    this.echo = function(val)
    {
        alert(val);
    }
}
