import React, {FC, useMemo} from 'react';
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
    isLoading:boolean
}

const Comments: FC<ICommentProps> = ({ comments,isLoading }) => {
    const { displayName } = useAuth();
    let prevAuthor = '';

    const mockData:any = [
        {
            "author": "დავით დანელია",
        },
        {
            "author": displayName,
        }
    ]

    const commentsArr = useMemo(() => {
        if(isLoading){
            return mockData
        }else{
            return comments
        }
    },[comments,isLoading])

    return (
        <div className={'w-full px-2 py-2'}>
            <div className={'h-full'}>
                {!isLoading && comments?.length === 0 && (
                    <div className={'w-full text-gray-400'}> კომენტარები არ არის :((</div>
                )}
                {commentsArr.map((item, index) => {
                    const isCurrentUser = item.author?.toLowerCase() === displayName?.toLowerCase();
                    const messageAlignment = isCurrentUser ? 'flex-row-reverse' : 'flex-row'; // Reverse alignment for the current user
                    const showAuthor = item.author !== prevAuthor;
                    prevAuthor = item.author;

                    return (

                        <React.Fragment key = {index}>
                            {showAuthor && (
                                <div className={`${isCurrentUser ? 'text-right' : 'text-left'} mr-1 ml-1`}>
                                    {isLoading ? '' : item.author}
                                </div>
                            )}
                            <div key={item?.created} className={`w-full flex ${messageAlignment}  mt-3`}>

                                <div className={'w-10 h-10'}>
                                    <FontAwesomeIcon icon={faUserCircle} className={`w-full h-full ${isLoading ? 'animate-pulse text-gray-200' : ''}`} />
                                </div>

                                <div>
                                    <div
                                        className={`w-auto max-w-lg rounded-lg shadow-2xl text-white p-2 ml-2 mr-2 break-words ${
                                            isLoading ? 'animate-pulse bg-gray-200 h-10 w-32' : 
                                            !isCurrentUser ? 'bg-custom_dark' : 'bg-custom_light'
                                        }`}
                                    >
                                        {item?.content}
                                    </div>
                                    <div className={'text-xs mr-2 ml-2 text-gray-500'}>
                                        {item?.created && (
                                            format(new Date(item?.created), 'dd MMM yyyy HH:mm:ss')
                                        )}
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>

                    );
                })}
            </div>
        </div>
    );
};

export default Comments;
