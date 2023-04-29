// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let apiURL = "https://forkify-api.herokuapp.com/api/v2/recipes";
let apikey = "8bc66bal-lc68-479d-9b15-5010856806db";

async function GetRecipes(recipeName,id,isAllShow) {
    let resp = await fetch(`${apiURL}?search=${recipeName}&key=${apikey}`);
    let result = await resp.json();
    let Recipes = isAllShow ? result.data.recipes : result.data.recipes.slice(0, 6);
    showRecipes(Recipes, id);
}

function showRecipes(recipes, id) {
    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: 'html',
        type: 'Post',
        url: '/Recipe/GetRecipeCard',
        data: JSON.stringify(recipes),
        success: function (htmlResult) {
            $('#' + id).html(htmlResult);
        }

    });
}


async function getOrderRecipe(id,showId) {
    let resp = await fetch('${apiURL}/${id}?key=${apikey}');
    let result = await resp.json();
    console.log(result);
    let recipe = result.data.recipe;
    showOrderRecipeDetails(recipe, showId);
}
function showOrderRecipeDetails(details, showId) {
    console.log(details)
    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: 'html',
        type: 'Post',
        url: '/Recipe/ShowOrder',
        data: JSON.stringify(details),
        success: function (htmlResult) {
            $('#' + showId).html(htmlResult);
        }

    });
}