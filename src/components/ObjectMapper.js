import React from 'react';
import Votes from './Votes';
import DeleteComment from './DeleteComment';
import '../styling/ObjectMapper.css';

const ObjectMapper = ({array, id, votes, removeComment}) => {
    return (
        <div className="parent">
            <ul className="bulletPoints">
                    {array.map((object, index) => {
                        let num = 0;
                    for (var key in object) {
                        num = num + 1;
                    }
                    const arr = [];
                        for (var key in object) {
                            if (key === 'created_at') {
                                const date = new Date(object[key]);
                                if (object[key] === null) {
                                    const formattedDate = 'unknown date';
                                    arr.push(key + ':' + ' ' + formattedDate)
                                } else {
                                    const formattedDate = date.toLocaleDateString();
                                    arr.push(key + ':' + ' ' + formattedDate)
                                }
                            } else if (key !== 'comment_id' && key !== 'votes' && key !== 'user_id' && key !== 'avatar_url') {
                                arr.push(key + ':' + ' ' + object[key]);
                            }
                    }
                    return <li key={'comment'[index]}>
                    <ul className="bulletPoints">
                        {arr.map((item) => {
                            return <li key={item}>{item}</li>
                        })}
                    </ul>
                    {(object.comment_id) &&
                    <>
                    <br />
                        <Votes type='comments' id={id} votes={votes} comment_id={object.comment_id} comment_votes={object.votes} />
                    <br />
                        <DeleteComment comment={object} id={id} comment_id={object.comment_id} removeComment = {removeComment}/>
                    <br /> 
                    </>
                    }
                    </li>;
                })}
                </ul>
        </div>
    );
};

export default ObjectMapper;