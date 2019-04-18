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
    return data.user;
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

export const postArticle = async (title, body, user_id, topic) => {
    const { data } = await axios.post(`${BASEURL}/topics/${topic}/articles`, { title, body, user_id });
    return data.article;
}

export const postComment = async (article_id, body, user_id) => {
    const { data } = await axios.post(`${BASEURL}/articles/${article_id}/comments`, {article_id, body, user_id});
    return data.comment;
}

export const deleteArticle = async (article_id) => {
    const { data } = await axios.delete(`${BASEURL}/articles/${article_id}`);
    return data.article;
}

export const deleteComment = async (article_id, comment_id) => {
    const { data } = await axios.delete(`${BASEURL}/articles/${article_id}/comments/${comment_id}`);
    return data.comment;
}