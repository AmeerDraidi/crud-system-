var p_name = document.getElementById("name")
var p_profession = document.getElementById("profession")
var p_salary = document.getElementById("salary")
var p_describtion = document.getElementById("describtion")
var data = document.getElementById("data")
var addbutton = document.getElementById("click")
var nameAlert = document.getElementById("nameAlert")
var clear = document.getElementById("clear")
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
    p_name.setAttribute("placeholder", "Please enter your name")
    p_name.classList.remove('is-valid')
    p_salary.classList.remove('is-valid')

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
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            names.splice(index, 1)
            localStorage.setItem("friends names", JSON.stringify(names))
            displayData()
            Swal.fire(
                'Deleted!',
                'This person has been deleted.',
                'success'
            )
        }
    })


}


var deleteAll = document.getElementById("deleteAll")
deleteAll.onclick = function () {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("friends names")
            data.innerHTML = ""
            names = []
            swalWithBootstrapButtons.fire(
                'Its all Deleted now!',
                'Your files has been deleted.',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your file is safe :)',
                'error'
            )
        }
    })

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


p_name.onkeyup = function () {
    var namePattern = /^[A-Z][a-z].{1,8}$/;
    if (namePattern.test(p_name.value)) {
        addbutton.removeAttribute("disabled");
        p_name.classList.add('is-valid')
        p_name.classList.remove('is-invalid')
        nameAlert.classList.add("d-none")
    }

    else if (p_name.value == "") {
        p_name.setAttribute("placeholder", "This is a compulsory field you should fill")
        p_name.classList.remove('is-invalid')
        nameAlert.classList.add("d-none")
    }

    else {
        addbutton.setAttribute("disabled", "disabled")
        p_name.classList.add('is-invalid')
        p_name.classList.replace('is-valid', 'is-invalid')
        nameAlert.classList.add("d-block")
        nameAlert.classList.remove('d-none')
    }
}



p_salary.onchange = function () {
    var namePattern = /^([2-9][0-9][0-9][0-9]|10000)$/;
    if (namePattern.test(p_salary.value)) {
        addbutton.removeAttribute("disabled");
        p_salary.classList.add('is-valid')
        p_salary.classList.remove('is-invalid')
    }

    else if (p_salary.value == "") {
        p_salary.setAttribute("placeholder", "This is a compulsory field you should fill")
        p_salary.classList.remove('is-invalid')
    }

    else {
        addbutton.setAttribute("disabled", "disabled")
        p_salary.classList.add('is-invalid')
        p_salary.classList.replace('is-valid', 'is-invalid')
    }
}














clear.onclick = function () {
    p_name.value = ""
    p_profession.value = ""
    p_salary.value = ""
    p_describtion.value = ""
    p_name.classList.remove('is-invalid')
    nameAlert.classList.add("d-none")
}




