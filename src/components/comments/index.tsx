import React, { FC } from 'react';
import { Textarea } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

interface IComments {
    author: string;
    content: string;
    created: string;
}

interface ICommentProps {
    comments: IComments[];
}

const Comments: FC<ICommentProps> = ({ comments }) => {
    const { displayName } = useAuth();
    let prevAuthor = '';

    return (
        <div className={'w-full px-2 py-2'}>
            <div className={'h-full'}>
                {comments?.length === 0 && (
                    <div className={'w-full text-gray-400'}> კომენტარები არ არის :((</div>
                )}
                {comments.map((item, index) => {
                    const isCurrentUser = item.author.toLowerCase() === displayName.toLowerCase();
                    const messageAlignment = isCurrentUser ? 'flex-row-reverse' : 'flex-row'; // Reverse alignment for the current user
                    const showAuthor = item.author !== prevAuthor;
                    prevAuthor = item.author;

                    return (

                        <>
                            {showAuthor && (
                                <div className={`${isCurrentUser ? 'text-right' : 'text-left'} mr-1 ml-1`}>
                                    {item.author}
                                </div>
                            )}
                            <div key={item.created} className={`w-full flex ${messageAlignment}  mt-3`}>

                                <div className={'w-10 h-10'}>
                                    <FontAwesomeIcon icon={faUserCircle} className={'w-full h-full'} />
                                </div>

                                <div>
                                    <div
                                        className={`w-auto max-w-lg rounded-lg shadow-2xl text-white p-2 ml-2 mr-2 break-words ${
                                            !isCurrentUser ? 'bg-custom_dark' : 'bg-custom_light'
                                        }`}
                                    >
                                        {item.content}
                                    </div>
                                    <div className={'text-xs mr-2 ml-2 text-gray-500'}>
                                        {format(new Date(item.created), 'dd MMM yyyy HH:mm:ss')}
                                    </div>
                                </div>
                            </div>
                        </>

                    );
                })}
            </div>
        </div>
    );
};

export default Comments;
