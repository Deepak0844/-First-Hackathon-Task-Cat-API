document.body.innerHTML = `
<nav class="navBar">
<input type="text" placeholder="Search Cats" id="searchBox" />
<button onclick="search()" ><i class="fas fa-search"></i></>
<button class="homeIcon"onclick="home()"><i class="fas fa-home"></i></>
</nav>
<section  class="cat-list"></section>
<div class="msg"></div>
`
//1.to list all cats on the screen
async function getAllCats(){
try {
  const data = await fetch("https://cataas.com/api/cats?tags=cute")
if(data.ok){//if response failed code will not execute
  const cats = await data.json();
  const catsContainer = document.querySelector(".cat-list")
  cats.forEach(cat =>{
  catsContainer.innerHTML +=
  `<div class="user-container">
  <img class = "cat-pic" src="https://cataas.com/cat/${cat.id}" alt="catImage"/>
  </div>`
}
)
}else{
 throw new Error("Response NOT OK - Failed To Fetch API ")
        }
}catch(ex){ //shows error to user if response failed
  const errorMsg = document.querySelector(".msg")
  errorMsg.innerHTML =`<div><h2 class="display"></h2></div>`
  document.querySelector(".display").innerText =ex.message
}} getAllCats()
  

//2.this function for filtering cats based on the searched keyword
 async function search(){
 try{
   const data = await fetch("https://cataas.com/api/cats?tags=cute")
 if(data.ok){ //if response failed code will not execute
   const cats = await data.json();
   const searchInput = document.querySelector("#searchBox").value
   const catsContainer = document.querySelector(".cat-list")
   catsContainer.innerHTML =" " //to refresh page when search button clicked
   cats.forEach(catPic =>{
//for loop
  for(let i=0;i<=catPic.tags.length;i++){ //filter required tagname from serach inputbox
      
// for searching tags in api
  if( catPic.tags[i] == searchInput){
    catsContainer.innerHTML +=
    `<div class="user-container">
     <img class = "cat-pic" src="https://cataas.com/cat/${catPic.id}" alt="catImage"/>`
}
}
})
 //to prevent empty input search 
if(searchInput==""){
    alert("input field is empty ")
    return getAllCats()
}
//to get random cat picture
else if(searchInput) {
    catsContainer.innerHTML += 
    `<p class="filterText">Result : ${searchInput}</p>
    <div class="user-container">
    <img  class="cat-pic"  src="https://cataas.com/cat/says/${searchInput}" alt="catImage"/>
    </div>`
}
} else {
      throw new Error("Response NOT OK - Failed To Fetch API")
}
} catch(err){ //it shows error to user if response failed
     const catsContainer = document.querySelector(".cat-list")
     catsContainer.innerHTML =" "
     const errorMsg = document.querySelector(".msg")
     errorMsg.innerHTML =`<div><h2 class="display"></h2></div>`
     document.querySelector(".display").innerText =err.message
}}

 //3.home button return to home tab 
 function home(){
     const catsContainer = document.querySelector(".cat-list")
     const searchInput = document.querySelector("#searchBox").value=""
     catsContainer.innerHTML =" "  //to erase old search 
     getAllCats() //refresh to home page
 }



