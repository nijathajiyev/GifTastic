$(document).ready(function () {
    $("#add-animal").on("click", function (e) {
        e.preventDefault();
        let animal = $("#animal-input").val();
        $("#animal-buttons").append(`<button value="${animal}">${animal}</button>`);
        $("#animal-input").val("");
    })

    $(document).on("click", "button", function () {
        let btnValue = $(this).val();
        // console.log(btnValue);

        giphy(btnValue);
    })

    let apiKey = "krw8YjfCF8uUytMw2EjHTe4E94QSaNOw";
    let giphy = data => {
        $.ajax({
            url: `https://api.giphy.com/v1/gifs/search?q=${data}&limit=10&api_key=` + apiKey,
            method: "GET"
        }).then(res => {
            console.log(res);
            renderImg(res.data);
        })
    }

    let renderImg = arr => {
        $("#animals").html(arr.map(item => {
            return (`
            <p>${item.rating}</p>
            <img src="${item.images.original_still.url}" 
            data-still="${item.images.original_still.url}"
            data-animate="${item.images.original.url}"
            data-state="still" class="gif animal-item"/>
         `)
        }))
    }

    $(document).on("click",".gif",function(){
        let state = $(this).attr("data-state");
        let still = $(this).attr("data-still");
        let animate = $(this).attr("data-animate");

        if(state == "still"){
            $(this).attr("src",animate);
            $(this).attr("data-state","animate");
        }else{
            $(this).attr("src",still);
            $(this).attr("data-state","still");
        }
    })
})