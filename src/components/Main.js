import React from 'react';
import Votes from './Votes';
import DeleteArticle from './DeleteArticle';

const Main = (props) => {
    const { article } = props;
    const date = new Date(article.created_at);
    const formattedDate = date.toLocaleDateString();
    props.article.count += 1

    return (
        props.article.count > 1 ?
        <div>
            <h2>{article.title}</h2>
                    <ul className="bulletPoints">
                        <li>author: {article.author}</li>
                        <li>topic: {article.topic}</li>
                        <li>body: {article.body}</li>
                        <li>created at: {formattedDate}</li>
                        <li>comment count: {article.comment_count}</li>
                    </ul>
                    <Votes type='articles' id={article.id} votes={article.votes}/>
                    <DeleteArticle id={article.article_id} />
        </div>
        : 
        <div>

        </div>
    );
};

export default Main;