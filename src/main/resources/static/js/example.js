
//-----------------------------------------------  Fetch -----------------------------------------//


// async function test() {
//     let response = await fetch('/userList');
//     let data = await response.json();
//     for (let i = 0; i < data.length; i++) {
//         console.log(data[i].firstName)
//     }
// }
//
// test();



// async function send_user() {
//
//     let responseSave = await fetch('userList/save', {
//         method: 'POST',
//         headers: {
//             'Content-Type' : 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({
//             firstName: $('#addFirstName').val(),
//             lastName: $('#addLastName').val(),
//             age: $('#addAge').val(),
//             email: $('#addEmail').val(),
//             password: $('#addPassword').val()
//
//         })
//     })
//
//     let result = await responseSave.json()
//     alert(result.message)
// }


// fetch('/userList')
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data[0].firstName);
//     });

//test().then(data => console.log(data));


//-------------------------------------------  Ajax  -------------------------------------//


// function showUsers(){
//     $.get('/userList', function (data){
//
//         let table = '<table> ';
//         for(let i = 0; i < data.length; i++){
//
//             table = table + '<tr> <td>' + data[i].id + ' </td> <td> ' + data[i].firstName + '</td> </tr>'
//
//         }
//         table = table + ' </table>';
//         $('#test_user').html(table)
//
//     })
// }


// $(document).ready(function (){
//   showUsers()
// })
//
// function send_user(){
//     $.ajax({
//         url: '/userList/save',
//         dataType: 'json',
//         type: 'POST',
//         cashe: false,
//         contentType: 'application/json',
//         data: JSON.stringify({
//             firstName: $('#addFirstName').val()
//         }),
//         success: function (){
//             showUsers()
//         }
//
//     })
// }