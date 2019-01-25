import axios from 'axios';

const BASEURL = 'https://nc-knews.herokuapp.com/api';

export const getArticles = async (topic, page = 0) => {
    if (page > -1) {
    const url = topic ? `${BASEURL}/topics/${topic}/articles?p=${page*10}` : `${BASEURL}/articles?p=${page*10}`;
    const { data } = await axios.get(url);
    return data.articles;
    }
};

export const getTopics = async () => {
    const { data } = await axios.get(`${BASEURL}/topics`);
    return data.topics;
}

export const getUsernames = async () => {
    const { data } = await axios.get(`${BASEURL}/users`);
    return data.users;
}

export const getUserByUsername = async (username) => {
    const { data } = await axios.get(`${BASEURL}/users/${username}`);
    return data.username;
}

export const updateArticleVotes = async (article_id, increment) => {
    const { data } = await axios.patch(`${BASEURL}/articles/${article_id}`, { inc_votes: increment });
    return data.articles;
}

export const updateCommentVotes = async (article_id, comment_id, increment) => {
    const { data } = await axios.patch(`${BASEURL}/articles/${article_id}/comments/${comment_id}`, { inc_votes: increment });
    return data.articles;
};

export const getCommentsByArticleId = async (article, page = 0) => {
    const { data } = await axios.get(`${BASEURL}/articles/${article}/comments?p=${page*10}`);
    return data.comments;
}

export const getArticleByArticleId = async (article) => {
    const { data } = await axios.get(`${BASEURL}/articles/${article}`);
    return data.articles[0];
}