//define our local namespace List
let github = (function () {
    // the function that triggers an Ajax call
    var check = function(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else if(response.status === 404) {
            document.querySelector("#warn").innerHTML = "User not exist.";
            document.getElementById("warn").style.display = "block";
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    function getData(name) {
        let html = "";
        fetch('https://api.github.com/users/'+ name).then(check)
            .then(function(response){
                response.json().then(function(data) {
                    html += '<div id="data" class="boxes leftBox">';
                    html += '<div class="loginName">'+data.login+'</div>';
                    html += '<ol>';
                })
                return fetch('https://api.github.com/users/'+name+"/repos");
            }).then(check).then(function (response) {
            response.json().then(function (data) {
                html += '<h2>Repositories</h2>';
                for (i of data) {
                    html += '<li><a href="' + i.html_url + '">'+ i.full_name+'</a></li>';
                }
                html += '<br>';
                fetch('https://api.github.com/users/'+name+"/followers")
                    .then(check).then(function (response) {
                    response.json().then(function (data) {
                        html += '<h2>Followers</h2>';
                        for (i of data) {
                            html += '<li><a href="' + i.html_url + '">'+ i.login+'</a></li>';
                        }
                        html += '</ol> </div>';
                        // display the HTML
                        document.querySelector("#data").innerHTML = html;
                    })
                })
            })
        }).catch(function (err) {
            console.log('Fetch Error :', err);
        })
    }

    function searchName () {
        var t = name();
        if(t === "")   // if t is empty
        {
            document.getElementById("error").innerHTML = "please enter a none empty Name";
            document.getElementById("error").style.display = "block";
        }
        else{
            getData(t);
        }
    }

    function saveName () {
        var t = name();
        fetch('http://localhost:4000/users/add?name=' + t)
            .then(function(response){
                response.json().then(function (data) {
                    if (data === 'exist') {
                        document.getElementById("error").innerHTML = t + " is already exist";
                        document.getElementById("error").style.display = "block";
                    }
                    if (data === 'empty'){
                        document.getElementById("error").innerHTML = t + " to save a neme please enter a non empty name";
                        document.getElementById("error").style.display = "block";
                    } else {
                        var html = "";
                        html += '<div id="server" class="boxes rightBox">';
                        html += '<div class="loginName">' + 'saved' + '</div>';
                        html += '<ol>';
                        for (i = 0; i < data.length; i++) {
                            html += '<li><a href="' + 'https://github.com/' + data[i].name + '">'+data[i].name+'</a></li>';
                        }
                        html += '</ol> </div>';

                        // display the HTML
                        document.querySelector("#server").innerHTML = html;
                    }
                });
            });
    }

    function deleteName () {
        var t = name()
        fetch('http://localhost:4000/users/delete?name=' + t)
            .then(function(response){
                response.json().then(function (data) {
                    if (data === 'not exist') {
                        document.getElementById("error").innerHTML = t + " is not exist";
                        document.getElementById("error").style.display = "block";
                    } else {
                        var html = "";
                        html += '<div id="server" class="boxes rightBox">';
                        html += '<div class="loginName">' + 'saved' + '</div>';
                        html += '<ol>';
                        for (i = 0; i < data.length; i++) {
                            html += '<li><a href="' + 'https://github.com/' + data[i].name + '">'+data[i].name+'</a></li>';
                        }
                        html += '</ol> </div>';

                        // display the HTML
                        document.querySelector("#server").innerHTML = html;
                    }
                });
            });
    }

    function name () {
        document.getElementById("error").style.display = "none";
        return (document.getElementById("input").value.trim());
    }

    function startSaveList() { // “start save list”
        console.log('list star')
        fetch('http://localhost:4000/users/allList')
            .then(function(response){
                response.json().then(function (data) {
                    var html = "";
                    html += '<div id="server" class="boxes rightBox">';
                    html += '<div class="loginName">' + 'saved' + '</div>';
                    html += '<ol>';
                    for (i = 0; i < data.length; i++) {
                        html += '<li><a href="' + 'https://github.com/' + data[i].name + '">'+data[i].name+'</a></li>';
                    }
                    html += '</ol> </div>';

                    // display the HTML
                    document.querySelector("#server").innerHTML = html;
                })
            })
    }

    // wait for the DOM before reaching elements
    window.addEventListener("DOMContentLoaded", (event) => {
        //add listeners
        document.getElementById("search").addEventListener('click', function(){searchName();});
        document.getElementById("save").addEventListener('click', function(){saveName();});
        document.getElementById("delete").addEventListener('click', function(){deleteName();});
        startSaveList();
    }, false);

})();   // end of local namespace