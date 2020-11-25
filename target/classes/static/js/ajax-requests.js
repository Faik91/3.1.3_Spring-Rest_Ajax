
$(function () {
    $.getJSON('/all-users', function (data) {
        console.log(data[0]);
        console.log(data[1]);
        console.log(data);


        $.each(data[0], function (index, jsonObject) {

            let roles = "";

            $.each(jsonObject.roles, function (roleIndex, roleObject) {
                $.each(roleObject, function (rolesKey, roleVal) {
                    if (rolesKey === "role") {
                        roles += " " + roleVal;
                    }
                });
            });

            $('#all-users-tbody').append("<tr class='user" + jsonObject.id + "'>" +
                "<td>" + jsonObject.id + "</td>" +
                "<td class='fordata'>" + jsonObject.firstName + "</td>" +
                "<td class='fordata'>" + jsonObject.lastName + "</td>" +
                "<td class='fordata'>" + jsonObject.age + "</td>" +
                "<td class='fordata'>" + jsonObject.email + "</td>" +
                "<td class='fordata'>" + roles.trim() + "</td>" +
                "<td><button type='button' class='btn btn-info edit-button'  data-toggle='modal' data-target='#modal-to-edit' " +
                "> Edit </button></td>" +
                "<td class='last_td'><button type='button' class='btn btn-danger delete-button' data-toggle='modal' data-target='#modal-to-delete' " +
                "> Delete </button></td>");
        });

        // Adding <option> with roles to <select> in "edit user form" and "new user form"
        $.each(data[1], function (index, roleJson) {
            $("#editSelect").append("<option value='" + roleJson.role + "'>" + roleJson.role + "</option>");
            $("#newUserSelect").append("<option value='" + roleJson.role + "'>" + roleJson.role + "</option>");
        })
    });

});

// ============= edit modal ===========

$(document).on("click", ".edit-button", function () {
    let siblings = $(this).parent().siblings(); //getting all <td> in the users table
    let inputs = $(".edit-input-container").find("input");// getting all <input> in the edit modal

    $.each(inputs, function (index, elem) {
        elem.value = "";
    });

    inputs[0].value = siblings[0].textContent; // setting the hidden id field in the edit modal
    console.log("the inputs[0] value is: " + inputs[0].value);
    console.log("the inputs[1] value is: " + inputs[1].value);
    console.log("the inputs[2] value is: " + inputs[2].value);
    console.log("the inputs[3] value is: " + inputs[3].value);

    // setting the fields in the edit modal
    for (let i = 0; i < siblings.length - 2; i++) {
        inputs[i + 1].value = siblings[i].textContent;
    }

    inputs[6].value = ""; // emptying the password field in case it`s not empty

    inputs.each(function (ind, elem) {
        console.log(elem.value);
    });


    // setting all <option> in the <select> of the edit modal
    // and marking the actual role selected
    $("#editSelect").children().each(function (index, optEl) {
        let optVal = optEl.getAttribute("value");
        let roleArray = siblings[5].textContent.split(" ");

        $(optEl).prop("selected", false);

        for (let k = 0; k < roleArray.length; k++) {
            if (optVal === roleArray[k]) {
                $(optEl).prop("selected", true);
            }
        }
    });
});

$("form.editForm").submit(function (event) {
    event.preventDefault();
    console.log("========in the edit user form script - start============");
    // let fields = $( ":input" ).serializeArray();

    // let fieldsstr4 = '[{"id":"4","name":"Михаил","lastName":"Белоусов","age":"4","email":"belousov@mail.ru","password":"123456","roles":[{"role": "USER"}, {"role": "ADMIN"}]}]';

    let formDataHolder = new FormData(editForm);
    // console.log(JSON.stringify(Object.fromEntries(formDataHolder.entries())));
    console.log(convertFormDataToJson(formDataHolder));

    $.ajax({
        method: "POST",
        url: "/admin/update-user",
        contentType: "application/json",
        processData: true,
        data: convertFormDataToJson(formDataHolder)
    })
        .done(function (data) {
            console.log("The user that is returned by server is: ");
            console.log(data);
            updateUserRow(data);
        });

    /*    $.post("/admin/update-user", done, function(data) {
            console.log(data);
        })*/
    $("#modal-to-edit").modal("hide");

});

function convertFormDataToJson(formData) {
    var object = {};
    formData.forEach((value, key) => {
        // Reflect.has in favor of: object.hasOwnProperty(key)
        if (!Reflect.has(object, key)) {
            object[key] = value;
            return;
        }
        if (!Array.isArray(object[key])) {
            object[key] = [{"role": object[key]}];
        }
        object[key].push({"role": value});
    });
    // The fix to when the role is just one
    if (!Array.isArray(object["roles"])) {
        object["roles"] = [{"role": object["roles"]}];
    }
    var json = JSON.stringify(object);
    return json;
}


function updateUserRow(user) {
    let userRowClass = ".user" + user.id;
    let tds = $(userRowClass).children(".fordata");
    console.log(tds);
    tds[0].innerHTML = user.firstName;
    tds[1].innerHTML = user.lastName;
    tds[2].innerHTML = user.age;
    tds[3].innerHTML = user.email;
    let allRoles = "";
    $.each(user.roles, function (ind, role) {
        allRoles += role.role + " ";
    })
    // tds[4].innerHTML = user.roles[0].role + " " + user.roles[1].role;
    tds[4].innerHTML = allRoles;
}


//===================== add new user ====================

$("form.newUserForm").submit(function (event) {
    event.preventDefault();

    console.log("=======in the new user form script - start==========");

    let newUserFormData = new FormData(newUserForm);
    console.log("newUserFormData converted into jSON");
    console.log(convertFormDataToJson(newUserFormData));

    $.ajax({
        method: "POST",
        url: "/admin/add-user",
        contentType: "application/json",
        processData: true,
        data: convertFormDataToJson(newUserFormData)
    })
        .done(function (data) {
            console.log("The user that is returned by server is: ");
            console.log(data);
            addNewUserToTable(data);
            cleanFrom("newtoClean");

        });

    /*    $.post("/admin/update-user", done, function(data) {
            console.log(data);
        })*/

});

function addNewUserToTable(user) {
    let rolesINtoRow = "";

    for (key in user.roles) {
        rolesINtoRow += user.roles[key].role + " ";
    }

    $('#all-users-tbody').append("<tr class='user" + user.id + "'>" +
        "<td>" + user.id + "</td>" +
        "<td class='fordata'>" + user.firstName + "</td>" +
        "<td class='fordata'>" + user.lastName + "</td>" +
        "<td class='fordata'>" + user.age + "</td>" +
        "<td class='fordata'>" + user.email + "</td>" +
        "<td class='fordata'>" + rolesINtoRow + "</td>" +
        "<td><button type='button' class='btn btn-info edit-button'  data-toggle='modal' data-target='#modal-to-edit' " +
        "> Edit </button></td>" +
        "<td class='last_td'><button type='button' class='btn btn-danger' data-toggle='modal' data-target='#modal-to-delete' " +
        "> Delete </button></td>");
}


function cleanFrom(inputClass) {

    console.log("In the cleaning function");
    if (inputClass === "newtoClean") {
        $.each($(".newtoClean"), function (ind, tag) {
            $(tag).val("");

        });
    }
    if (inputClass === "deleteModalInput") {
        $.each($(".deleteModalInput"), function (ind, tag) {
            tag.value = "";

        });
    }
    console.log("In the cleaning function === after cleaning");
}


// ============= delete modal ===========

$(document).on("click", ".delete-button", function () {
    let siblings = $(this).parent().siblings(); //getting all <td> in the users table
    let inputs = $(".delete-input-container").find("input");// getting all <input> in the delete modal

    $.each(inputs, function (index, elem) {
        elem.value = "";
    });

    inputs[0].value = siblings[0].textContent; // setting the hidden id field in the delete modal
    console.log("the inputs[0] value is: " + inputs[0].value);
    console.log("the inputs[1] value is: " + inputs[1].value);
    console.log("the inputs[2] value is: " + inputs[2].value);
    console.log("the inputs[3] value is: " + inputs[3].value);

    // setting the fields in the delete modal
    for (let i = 0; i < siblings.length - 2; i++) {
        inputs[i + 1].value = siblings[i].textContent;
    }

    // inputs[6].value = ""; // emptying the password field in case it`s not empty

    inputs.each(function (ind, elem) {
        console.log(elem.value);
    });


    // setting all <option> in the <select> of the delete modal
    // and marking the actual role selected

    let roleArray2 = siblings[5].textContent.split(" ");

    //==============
    let allOptions3 = $(".deleteSelect").children();
    if (allOptions3 != null) {
        $.each(allOptions3, function (ind, opt) {
            opt.remove();
        });
    }
    ///==========

    $.each(roleArray2, function (ind, role) {

        $("#deleteSelect").append("<option value='" + role + "'>" + role + "</option>");
    });


});

$("form.deleteForm").submit(function (event) {
    event.preventDefault();

    console.log("=======in the delete user form script - start==========");

    let idToDelete = $(".deletModalId").val();
    console.log("the id is: " + idToDelete);

    $.ajax({
        method: "POST",
        url: "/admin/delete-user",
        contentType: "application/json",
        processData: true,
        data: idToDelete.trim()
    })
        .done(function (data) {
            console.log("The user that is returned by server is: ");
            console.log(data);
            deleteRow(idToDelete);
        });
});

function deleteRow(id) {
    $("#modal-to-delete").modal("hide");
    // cleaning <input> elements
    cleanFrom("deleteModalInput");
    //cleaning the <option> elements
    let allOptions2 = $(".deleteSelect").children();
    $.each(allOptions2, function (ind, opt) {
        opt.remove();
    });
    // deleting the table <tr> with the deleted user's data
    let trRow = "user" + id;
    console.log("the tr id is " + trRow);
    $("." + trRow).remove();
}
