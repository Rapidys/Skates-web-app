import React, {FC, useEffect, useRef, useState} from 'react';
import {Modal, Textarea} from "flowbite-react";
import Button from "../../Button";
import Comments from "../../comments";
import {useServices} from "../../../context/Services/ServiceContextProvider";


interface ICommentsModal {
    handleCloseModal: (modalType: string) => void,
    openModal: boolean,
    title: string,
    onSend: (comment: string, callBack: () => void) => void,
    orderId: number,
}

const CommentsModal: FC<ICommentsModal> = ({openModal, handleCloseModal, title, onSend, orderId}) => {

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)


    const refTextArea = useRef<HTMLTextAreaElement | null>();
    const bodyRef = useRef<HTMLDivElement | null>();
    const {services} = useServices()


    const getComments = () => {
        services.Dashboard.getComments(orderId).then(res => {
            setComments(res?.data)
            setLoading(false)
        })
    }

    const scrollToBottom = () => {
        setTimeout(() => {
            if (bodyRef.current) {
                bodyRef.current.scrollTo({
                    top: bodyRef.current.scrollHeight,
                    left: 0,
                    behavior: "smooth",
                })
            }
        },300)

    }

    useEffect(() => {
        if (openModal) {
            setLoading(true)
            getComments()
            scrollToBottom()
        }
    }, [openModal]);

    return (
        <Modal show={openModal} onClose={() => handleCloseModal('commentsModal')} dismissible>
            <Modal.Header>
                    <span className={'text-custom_light'}>
                       {title}
                    </span>
            </Modal.Header>
            <Modal.Body >
                <div className={'overflow-y-scroll h-64'} ref = {bodyRef}>
                    <Comments comments={comments} isLoading = {loading}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={'w-full flex-col'}>
                    <div>
                        <Textarea
                            id="comment"
                            placeholder="კომენტარი..."
                            ref={refTextArea}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && comment.trim().length > 0) {
                                    onSend(comment, getComments)
                                    setComment('')
                                    if (refTextArea.current) {
                                        // @ts-ignore
                                        refTextArea.current.blur()
                                        setTimeout(() => {
                                            refTextArea.current.focus()
                                        },300)
                                    }
                                    scrollToBottom()
                                }
                            }}
                            rows={4}
                        />
                    </div>

                    <div className={'mt-2 flex justify-end'}>
                        <Button onClick={() => {
                            onSend(comment, getComments)
                            setComment('')
                            scrollToBottom()
                        }}
                                disabled={comment.trim().length <= 0}
                        >
                            გაგზავნა
                        </Button>
                    </div>
                </div>


            </Modal.Footer>
        </Modal>
    );
};

export default CommentsModal;