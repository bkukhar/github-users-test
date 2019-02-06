let data;

const api = 'https://api.github.com/search/users?q=';

// const apiKey = '&sort=stars&order=desc';

let input;

function gotSearchData(data) {
document.getElementById('search').addEventListener('click', function(){
    input = document.getElementById('username').value;
    const url = api + input;
    fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data) {
        const users = data.items;
        const currentResult = document.querySelector('.result');
        currentResult.parentNode.removeChild(currentResult);
        const refreshedResult = document.createElement('DIV');
        refreshedResult.setAttribute('class', 'result');
        document.querySelector('.public-api-result').appendChild(refreshedResult);
        domPage(users);
}
});
});
}


function domPage(users) {
    for (let i = 0; i < users.length; i++) {
        const userDiv = document.createElement('DIV');
        document.querySelector('.result').appendChild(userDiv);
        userDiv.setAttribute('class', 'user-info');
        const image = document.createElement('IMG');
        const header = document.createElement('H4');
        const userLogin = document.createTextNode(JSON.stringify(users[i].login));
        const userAvatar = document.createTextNode(JSON.stringify(users[i].avatar_url));
        image.setAttribute('class', 'user-image' + i);
        userDiv.appendChild(image);
        const imageLink = 'url(' + userAvatar.textContent + ')';
        $('.user-image' + i).css('content', imageLink);
        const usernameLogin = String(userLogin.textContent).substring(1).slice(0, -1);
        const usernameHeader = document.createTextNode('@' + usernameLogin);
        header.appendChild(usernameHeader);
        userDiv.appendChild(header);
        const links = document.createElement('DIV');
        userDiv.appendChild(links);
        links.setAttribute('class', 'links');
        const para = document.createElement('A');
        const userProfile = document.createElement('A');
        const userProficonstext = document.createTextNode('Check Profile');
        userProfile.appendChild(userProficonstext);
        const userProfileLink = '../user_profile/#' + usernameLogin;
        userProfile.href = userProfileLink;
        userProfile.setAttribute('class', 'viewProfile');
        const userRepo = document.createTextNode(JSON.stringify(users[i].html_url));
        para.setAttribute('class', 'user-profile' + i);
        const linkName = document.createTextNode('Open on GitHub');
        para.appendChild(linkName);
        const repoText = String(userRepo.textContent).substring(1).slice(0, -1);
        para.href = repoText;
        const repoLink = 'url(' + userRepo.textContent + ')';
        $('.user-profile' + i).css('content', repoLink);
        links.appendChild(para);
        links.appendChild(userProfile);
    }

}

gotSearchData(data);

