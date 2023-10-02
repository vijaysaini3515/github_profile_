const APIURL = "https://api.github.com/users/";
const searchBox = document.querySelector("#search");


const main = document.querySelector("#main")


const getuser =async(username)=>{
    let response = await fetch(APIURL+username)
    let data = await response.json()

    const card = `
    <div class="card">
    <div class="image_container">
      <img class="avatar"  src="${data.avatar_url}" alt="" />
    </div>
    <div class="user-info">
      <h2>${data.name}</h2>
      <p>${data.bio}</p>

      <ul class="info">
        <li>${data.followers}<strong>followers</strong></li>
        <li>${data.following}<strong>following</strong></li>
        <li>${data.public_repos}<strong>public_repos</strong></li>
      </ul>

      <div id="repos">
       
      </div>
    </div>
  </div>
    `
    main.innerHTML = card;
    getRepo(username)
}

const getRepo = async(username) =>{
    const repos = document.querySelector("#repos")
    let response = await fetch(APIURL+username+"/repos")
    let data = await response.json()

    data.forEach((item)=>{
        let elem = document.createElement("a")
        elem.classList.add("repo")
        elem.href = item.html_url
        elem.target = "_blank"
        elem.innerText = item.name
        repos.appendChild(elem);
    })

}

const formSubmit = ()=>{
    console.log(searchBox)
    if(searchBox !=""){
        getuser(searchBox.value);
        searchBox.value = "";
    }
    return false;

}

searchBox.addEventListener("focusout",()=>{
    formSubmit()
})

getuser();

