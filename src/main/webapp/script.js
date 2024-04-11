let request = new XMLHttpRequest();
request.open("GET", "cars.json");

request.responseType = "json";
request.send();

// после загрузки файла JSON
request.onload = function() {
    let cars = request.response;
    fillTable(cars);
}

// заполнение таблицы из JSON файла
function fillTable(cars) {  
    let tbody = document.querySelector("tbody");

    cars.forEach(car => {        
        let newRow = document.createElement("tr");
        
        newRow.innerHTML = `<td>${car["brand"]}</td><td>${car["model"]}</td><td>${car["year"]}</td><td>${car["mileage"]}</td><td>${car["color"]}</td><td>${car["price"]}</td>`;
        tbody.appendChild(newRow);
    });
}

/* --------------------------------------------------------------- */

document.getElementById("add").addEventListener("click", function () {
    var xhr = new XMLHttpRequest(),
    jsonArr,
    method = "GET",
    jsonRequestURL = "cars.json";
    
    let formData = new FormData(document.getElementById("addition"));

    xhr.open(method, jsonRequestURL);
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            // we convert your JSON into JavaScript object
            jsonArr = JSON.parse(xhr.responseText);

            // we add new value:
            jsonArr.push(formData);

            // we send with new request the updated JSON file to the server:
            xhr.open("POST", jsonRequestURL);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            
            xhr.send("jsonTxt=" + JSON.stringify(jsonArr));
            // but on this place you have to have a server for write updated JSON to the file
            
            location.reload();
        }
    };
    xhr.send();
});