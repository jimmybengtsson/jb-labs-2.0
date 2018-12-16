import axios from 'axios'
import {gitHubRepos, gitHubRepoReadme} from '../../config/Config'

let serverURL = 'http://localhost:5000/'



/*export const userLogin = (data) => {
  let tempObj = {
    userName: data.userName,
    password: data.password,
  }

  return axios({
    method: 'post',
    url: serverURL + 'login',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json'}
  })
}

export const updateArticle = (data, token, id) => {
  let tempObj = {
    category: data.category,
    description: data.description,
    text: data.text,
    author: data.author,
    area: data.area,
    modified: Date.now(),
    title: data.title,
  }

  return axios({
    method: 'put',
    url: serverURL + 'article',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json', 'x-access-token': token, 'id': id}
  })
}*/

export const getLatestRepos = () => {

  let type = '?type=all';
  let sort = '&sort=pushed';

  return axios({
    method: 'get',
    url: gitHubRepos + type + sort,
    headers: {'Content-Type': 'application/json',}
  })
}

export const getGithubReadme = (item) => {

  let url = gitHubRepoReadme + item.name + '/master/README.md'

  return axios({
    method: 'get',
    url: url,
    headers: {'Content-Type': 'application/json',}
  })
}