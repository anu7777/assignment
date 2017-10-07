games = [
    {'publisher' : 'Broderbund', 'avatar' : 'https://archive.org/services/img/msdos_Where_in_the_World_is_Carmen_Sandiego_1985', 'subject' : 'Where in the World is Carmen Sandiego', 'body' : 'Capture the thief that stole the artifact using clues dealing with your knowledge of geography.', 'date' : '1985', 'ifrmSrc' : 'https://archive.org/embed/msdos_Where_in_the_World_is_Carmen_Sandiego_1985'},
    {'publisher' : 'Ingenuity', 'avatar' : 'https://archive.org/services/img/msdos_Crosscountry_Canada_1991', 'subject' : 'Crosscountry Canada', 'body' : 'Drive an 18-wheel truck picking up and delivering a variety of commodities with typed-in commands.', 'date' : '1991', 'ifrmSrc' : 'https://archive.org/embed/msdos_Crosscountry_Canada_1991'},
    {'publisher' : 'Namco', 'avatar' : 'https://archive.org/services/img/msdos_Pac-Man_1983', 'subject' : 'Pac-Man', 'body' : 'Pac-Man stars a little, yellow dot-muncher who works his way around to clear a maze of the dots.', 'date' : '1983', 'ifrmSrc' : 'https://archive.org/embed/msdos_Pac-Man_1983'},

];

trash = [];

// checking storage

var check_local_storage = function () {

    if(localStorage.getItem("games_list") == null)
    {
        return false;
    }
    else {
        return true;
    }
};

if(!check_local_storage())
{
    localStorage.setItem("games_list" , JSON.stringify(games));
    localStorage.setItem("deleted_games" , JSON.stringify(trash));
}

// on click inbox items
var expand_inbox = function (index) {


    return function () {
        $(".email-item").removeClass('email-item-selected');

        $('#l'+index+'').addClass('email-item-selected');
        show_main_content(index);
    }


}

// on click trash item
var expand_trash = function (index) {


    return function () {
        $(".email-item").removeClass('email-item-selected');

        $('#l'+index+'').addClass('email-item-selected');
        show_trash_content(index);
    }


}


// inbox list
var display_inbox_list = function () {

    var data = JSON.parse(localStorage.getItem("games_list"));


        var list_holder = `<div id="list_holder" class="pure-u-1">

    </div>`;

        document.getElementById('list').innerHTML = list_holder;

        for (var i = 0; i < data.length; i++) {
            var div = document.createElement('div');

            div.onclick = expand_inbox(i);


            var list_items = `<div class="email-item  pure-g " id="l${i}">
            <div class="pure-u">
                <img width="64" height="64" alt="avatar" class="email-avatar" src="${data[i]['avatar']}">
            </div>

            <div class="pure-u-3-4">
                <h5 class="email-name">${data[i]['publisher']}</h5>
                <h4 class="email-subject">${data[i]['subject']}</h4>
                <p class="email-desc">
                   ${data[i]['body']}
                </p>
            </div>
        </div>`

            div.innerHTML = list_items;

            document.getElementById('list_holder').appendChild(div);
        }

        $('#l0').addClass('email-item-selected');
        show_main_content(0);



};

// play game
var show_main_content = function (index) {

    var data = JSON.parse(localStorage.getItem("games_list"));

    if(data.length > 0 ) {


        var content = ` <div class="email-content">
            <div class="email-content-header pure-g">
                <div class="pure-u-1-2">
                    <h1 class="email-content-title">${data[index]['subject']}</h1>
                    <p class="email-content-subtitle">
                        From <a>${data[index]['publisher']}</a> at <span>${data[index]['date']}</span>
                    </p>
                </div>

                <div class="email-content-controls pure-u-1-2">
                    <button class="secondary-button pure-button" onclick="delete_game(${index})">Delete</button>
                    <button class="secondary-button pure-button">Forward</button>
                    <button class="secondary-button pure-button">Move to</button>
                </div>
            </div>

            <div class="email-content-body" style="height: 500px">
              <iframe width="100%" height="100%" src="${data[index]['ifrmSrc']}"></iframe>
            </div>
        </div>`

        document.getElementById('main').innerHTML = content;

    }

    else {
        document.getElementById('main').innerHTML = '';

    }

};

// delete game click
var delete_game = function (index) {


    var data = JSON.parse(localStorage.getItem("games_list"));

    var trash_data =  JSON.parse(localStorage.getItem("deleted_games"));

    trash_data.unshift(data[index]);

    data.splice(index , 1);

    localStorage.setItem("games_list" , JSON.stringify(data));

    localStorage.setItem("deleted_games" , JSON.stringify(trash_data));



    display_inbox_list();


};


// restore click
var restore_game = function (index) {


    var data = JSON.parse(localStorage.getItem("games_list"));

    var trash_data =  JSON.parse(localStorage.getItem("deleted_games"));

    data.unshift(trash_data[index]);

    trash_data.splice(index , 1);

    localStorage.setItem("games_list" , JSON.stringify(data));

    localStorage.setItem("deleted_games" , JSON.stringify(trash_data));



    display_trash_list();


};


// trash games list
var display_trash_list = function () {

    var data = JSON.parse(localStorage.getItem("deleted_games"));

    var list_holder = `<div id="list_holder" class="pure-u-1">

    </div>`;

    document.getElementById('list').innerHTML = list_holder;

    for (var i = 0 ; i < data.length ; i ++)
    {
        var div = document.createElement('div');

        div.onclick = expand_trash(i);


        var list_items = `<div class="email-item  pure-g " id="l${i}">
            <div class="pure-u" >
                <img width="64" height="64" alt="avatar" class="email-avatar" src="${data[i]['avatar']}">
            </div>

            <div class="pure-u-3-4">
                <h5 class="email-name">${data[i]['publisher']}</h5>
                <h4 class="email-subject">${data[i]['subject']}</h4>
                <p class="email-desc">
                   ${data[i]['body']}
                </p>
            </div>
        </div>`

        div.innerHTML = list_items;

        document.getElementById('list_holder').appendChild(div);
    }

    $('#l0').addClass('email-item-selected');
    show_trash_content(0)


};

// show trash selected game
var show_trash_content = function (index) {

    var data = JSON.parse(localStorage.getItem("deleted_games"));



    if(data.length > 0) {
        var content = ` <div class="email-content">
            <div class="email-content-header pure-g">
                <div class="pure-u-1-2">
                    <h1 class="email-content-title">${data[index]['subject']}</h1>
                    <p class="email-content-subtitle">
                        From <a>${data[index]['publisher']}</a> at <span>${data[index]['date']}</span>
                    </p>
                </div>

                <div class="email-content-controls pure-u-1-2">
                    <button class="secondary-button pure-button" onclick="restore_game(${index})">Deleted</button>
                    <button class="secondary-button pure-button">Forward</button>
                    <button class="secondary-button pure-button">Move to</button>
                </div>
            </div>

           <div class="email-content-body" style="height: 500px">
              <iframe width="100%" height="100%" src="${data[index]['ifrmSrc']}"></iframe>
            </div>
        </div>`

        document.getElementById('main').innerHTML = content;
    }

    else {
        document.getElementById('main').innerHTML = '';
    }

};


// new game layout
var new_game = function () {

    var content = `<div style="padding: 20px"><label>Game Title</label>
               <input placeholder="enter title" id="title_"><br>
              <label>Publisher</label>
               <input placeholder="enter publisher name" id="publisher_"><br>
              <label>Published On</label>
               <input placeholder="enter name" id="date_"><br>
               <label>Description</label>
               <textarea placeholder="enter description" id="description_"></textarea><br>
               <label>Avatar Url</label>
               <input placeholder="enter url" id="avatar_"><br>
               <label>IFrame Url</label>
               <input placeholder="enter url" id="iframe_"><br>
               <button onclick="add_game()">SAVE</button>`


    document.getElementById('main').innerHTML = content;

}

// inbox navigation click
var open_inbox = function () {

    display_inbox_list();
    show_main_content(0);
    $('#l0').addClass('email-item-selected');


}


// save game
var add_game = function () {

    let game = {
        publisher : $('#publisher_').val(),
        avatar : $('#avatar_').val(),
        subject : $('#title_').val(),
        body : $('#description_').val(),
        date : $('#date_').val(),
        ifrmSrc : $('#iframe_').val(),
    };


    var games = JSON.parse(localStorage.getItem("games_list"));

    games.unshift(game);

    localStorage.setItem("games_list", JSON.stringify(games));
    display_inbox_list();

}

display_inbox_list();

