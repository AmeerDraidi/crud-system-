var p_name = document.getElementById("name")
var p_profession = document.getElementById("profession")
var p_salary = document.getElementById("salary")
var p_describtion = document.getElementById("describtion")
var data = document.getElementById("data")
var addbutton = document.getElementById("click")
var currentIndex;
var names
if (localStorage.getItem("friends names") == null) {
    names = []
}
else {
    names = JSON.parse(localStorage.getItem("friends names"))
    displayData();
}

addbutton.onclick = function () {
    if (addbutton.innerHTML == 'Add') {
        addnames()
    }
    else {
        updateNames()
        addbutton.innerHTML = 'Add'
    }
    displayData()
    clearData()
}

function addnames() {
    var name = {
        namee: p_name.value,
        profession: p_profession.value,
        salary: p_salary.value,
        describtion: p_describtion.value,
    }

    names.push(name)
    localStorage.setItem("friends names", JSON.stringify(names))
}

function displayData() {
    var result = ""
    for (var i = 0; i < names.length; i++) {
        result += `<tr>
        <td>${i}</td>
        <td>${names[i].namee}</td>
        <td>${names[i].profession}</td>
        <td>${names[i].salary}</td>
        <td>${names[i].describtion}</td>
        <td> <button onclick = "getNameData(${i})" class= "btn btn-outline-info">Update</button>
      <button onclick = "deleteNames(${i})" class= "btn btn-outline-danger">Delete</button></td>
    </tr>`
    }
    data.innerHTML = result;

}

function clearData() {
    p_name.value = ""
    p_profession.value = ""
    p_salary.value = ""
    p_describtion.value = ""
}

function deleteNames(index) {
    names.splice(index, 1)
    localStorage.setItem("friends names", JSON.stringify(names))
    displayData()
}


var deleteAll = document.getElementById("deleteAll")
deleteAll.onclick = function () {
    localStorage.removeItem("friends names")
    data.innerHTML = ""
    names = []

}


// or
// var deleteAll = document.getElementById("deleteAll")
// deleteAll.onclick = function (indexx) {
//     names.splice(indexx, names.length)
//     localStorage.setItem("friends names", JSON.stringify(names))
//     displayData()
// }


function getNameData(index) {

    var name = names[index]
    p_name.value = name.namee;
    p_profession.value = name.profession;
    p_salary.value = name.salary;
    p_describtion.value = name.describtion;
    addbutton.innerHTML = "update"
    currentIndex = index
}




function updateNames() {
    var name = {
        namee: p_name.value,
        profession: p_profession.value,
        salary: p_salary.value,
        describtion: p_describtion.value,
    };
    names[currentIndex].namee = name.namee
    names[currentIndex].profession = name.profession
    names[currentIndex].salary = name.salary
    names[currentIndex].describtion = name.describtion


    localStorage.setItem("friends names", JSON.stringify(names))

}








// function updateNames() {
//     addnames()
//     function displayyData() {
//         var result = ""
//         for (var i = 0; i < names.length; i++) {
//             result = `<tr>
//             <td>${i}</td>
//             <td>${names[i].namee}</td>
//             <td>${names[i].profession}</td>
//             <td>${names[i].salary}</td>
//             <td>${names[i].describtion}</td>
//             <td> <button onclick = "updateNames(${i})" class= "btn btn-outline-info">Update</button>
//           <button onclick = "deleteNames(${i})" class= "btn btn-outline-danger">Delete</button></td>
//         </tr>`
//         }
//         data.innerHTML = result;

//     }
//     displayyData()
//     clearData()
// }



function search(s) {
    var result = ""
    for (var i = 0; i < names.length; i++) {
        if (names[i].namee.toLowerCase().includes(s.value.toLowerCase())) {
            result += `<tr>
        <td>${i}</td>
        <td>${names[i].namee}</td>
        <td>${names[i].profession}</td>
        <td>${names[i].salary}</td>
        <td>${names[i].describtion}</td>
        <td> <button onclick = "updateNames()" class= "btn btn-outline-info">Update</button>
      <button onclick = "deleteNames(${i})" class= "btn btn-outline-danger">Delete</button></td>
    </tr>`
        }
    }
    data.innerHTML = result;

}
