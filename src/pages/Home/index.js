

function Home() {

    const getCookie = (cname) => {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }

    const username = getCookie('username');
    const email = getCookie('email')
    const avatar = getCookie('avatar')



    return <>
        <h1>{username}</h1>
        <h1>{email}</h1>
        <img src={avatar} alt="" />

    </>;
}

export default Home;
