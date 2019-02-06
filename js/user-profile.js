const userApi = 'https://api.github.com/users/';
const userName = window.location.hash;
const user = userName.substring(1).slice(0, userName.length);

const userUrl = userApi + user;
const repoUrl = userApi + user + '/repos';
let data;

function gotGitUserData(data) {
    fetch(userUrl)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const element = document.querySelector('.profile-header');
                const image = document.createElement('IMG');
                const userAvatar = document.createTextNode(JSON.stringify(data.avatar_url));
                image.setAttribute('class', 'user-image');
                element.appendChild(image);
                const imageLink = 'url(' + userAvatar.textContent + ')';
                $('.user-image').css('content', imageLink);
                const header = document.createElement('H1');
                document.querySelector('.profile-header').appendChild(header);
                const userLogin = document.createTextNode(JSON.stringify(data.login));
                const usernameLogin = String(userLogin.textContent).substring(1).slice(0, -1);
                const usernameHeader = document.createTextNode(usernameLogin);
                header.appendChild(usernameHeader);
                const para = document.createElement('A');
                const userRepo = document.createTextNode(JSON.stringify(data.html_url));
                para.setAttribute('class', 'user-profile-link');
                const linkName = document.createTextNode('View on GitHub');
                para.appendChild(linkName);
                const repoText = String(userRepo.textContent).substring(1).slice(0, -1);
                para.href = repoText;
                const repoLink = 'url(' + userRepo.textContent + ')';
                $('.user-profile-link').css('content', repoLink);
                element.appendChild(para);

                const gitNameData = document.createTextNode(JSON.stringify(data.name));
                userInformation('name', gitNameData);

                const gitDateData = document.createTextNode(JSON.stringify(data.created_at));
                userInformation('created_at', gitDateData);

                const gitLocationData = document.createTextNode(JSON.stringify(data.location));
                userInformation('location', gitLocationData);

                const gitCompanyData = document.createTextNode(JSON.stringify(data.company));
                userInformation('company', gitCompanyData);

                const gitEmailData = document.createTextNode(JSON.stringify(data.email));
                userInformation('email', gitEmailData);

            }
        })

        .catch(error => console.log('error is', error));




}

function userInformation(className, createContent) {
    const findByClass = document.querySelector('.' + className);
    if (createContent.textContent !== 'null') {
        const createValue = String(createContent.textContent).substring(1).slice(0, -1);
        const addValue = document.createTextNode(createValue);
        findByClass.appendChild(addValue);
    }
}

gotGitUserData(data);

function gotRepoData(data) {
    fetch(repoUrl)
        .then(response => response.json())
        .then(data => {

            if (data) {
                for (let i = 0; i < data.length; i++) {
                    const elementn = document.querySelector('.repo-list');
                    const linkn = document.createElement('A');
                    const userRepon = document.createTextNode(JSON.stringify(data[i].html_url));
                    const repoNamen = document.createTextNode(JSON.stringify(data[i].name));
                    linkn.setAttribute('class', 'repo-link');
                    const linkName = String(repoNamen.textContent).substring(1).slice(0, -1);
                    const linkNamen = document.createTextNode(linkName);
                    linkn.appendChild(linkNamen);
                    const repoText = String(userRepon.textContent).substring(1).slice(0, -1);
                    linkn.href = repoText;
                    elementn.appendChild(linkn);
                }
            }
        });
}

gotRepoData(data);
