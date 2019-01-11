import axios from 'axios';

const BASEURL = 'https://nc-knews.herokuapp.com/api';

export const getArticles = async (topic) => {
    const url = topic ? `${BASEURL}/topics/${topic}/articles` : `${BASEURL}/articles`;
    const { data } = await axios.get(url);
    return data.articles;
};

export const getTopics = async () => {
    const { data } = await axios.get(`${BASEURL}/topics`)
    return data.topics;
}

export const getUsernames = async () => {
    const { data } = await axios.get(`${BASEURL}/users`)
    return data.users;
}

export const getCurrentVotes = async (article) => {
    const { data } = await axios.patch(`${BASEURL}/articles/${article}`, article.votes);
    // console.log(data)
    return data.articles;
}

export const getCommentsByArticleId = async (article) => {
    const { data } = await axios.get(`${BASEURL}/articles/${article}/comments`);
    // console.log(data)
    return data.comments;
}

