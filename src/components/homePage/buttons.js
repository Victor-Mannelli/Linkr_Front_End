import { useState } from "react";
import { deletePost, updatePost } from "../../service/server";
import { ThreeDots } from 'react-loader-spinner';
import Modal from 'react-modal';
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { CreateConfig } from "../../service/config";

Modal.setAppElement('#root');

export default function Buttons({ obj, newCaption }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formInf, setFormInf] = useState({ newCaption: newCaption });
    const [isEditing, setIsEditing] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const config = CreateConfig();

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function deletePostFunction() {
        setIsDisable(true);

        deletePost(obj.id, config)
            .then((res) => {
                closeModal();
                setIsDisable(false);
            })
            .catch((error) => {
                alert('Could not delete the post');
                console.log(error);
                closeModal();
                setIsDisable(false);
            });
    }

    function editPost() {
        isEditing ? resetForm() : setIsEditing(true);
    }

    function onKeyPress(e) {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleForm();
        }
        if (e.keyCode === 27) resetForm();
    }

    function resetForm() {
        setIsEditing(false);
        setFormInf({
            ...formInf,
            newCaption: newCaption,
        });
    }

    function updateInfs(e) {
        setFormInf({
            ...formInf,
            [e.target.name]: e.target.value
        });
    }

    function focus(e) {
        var val = e.target.value;
        e.target.value = '';
        e.target.value = val;
    }

    function handleForm(e) {
        setIsDisable(true);
        const split = formInf.newCaption.split("#");
        const trends = split.map(e => e.split(" ")[0]);
        trends.shift();
        const body = { ...formInf, newTrend: trends }
        console.log(formInf);

        const promise = updatePost(obj.id, body);
        promise
            .then((r) => {
                setFormInf({ newCaption: formInf.newCaption });
                setIsDisable(false);
                setIsEditing(false);
            })
            .catch(() => {
                alert("An error has occurred on editing post's caption");
                setIsDisable(false);
            });
    }

    return (
        <DivButton>
            <Edit onClick={editPost} />
            <Delete onClick={openModal} />
            <Modal
                isOpen={modalIsOpen}
                style={modalStyle}
                onRequestClose={closeModal}
                isDisable={isDisable}
                setIsDisable={setIsDisable}
                obj={obj}
                contentLabel="Example Modal"
                action="delete"
            >
                <h2 style={modalStyle.h2}>Are you sure you want to delete this post?</h2>
                <div style={{ display: 'flex' }}>
                    {
                        isDisable ?
                            <>
                                <button style={modalStyle.cancelButton} disabled>
                                    <ThreeDots
                                        height="20"
                                        width="50"
                                        radius="9"
                                        color="#1877F2"
                                        ariaLabel="three-dots-loading"
                                    />
                                </button>
                                <button style={modalStyle.confirmButton} disabled>
                                    <ThreeDots
                                        height="20"
                                        width="50"
                                        radius="9"
                                        color="#ffffff"
                                        ariaLabel="three-dots-loading"
                                    />
                                </button>
                            </> :
                            <>
                                <button style={modalStyle.cancelButton} onClick={closeModal}>No, go back</button>
                                <button style={modalStyle.confirmButton} onClick={deletePostFunction}>Yes, delete it</button>
                            </>
                    }
                </div>
            </Modal>
            {
                isEditing ?

                    <form onSubmit={handleForm}>
                        <textarea type="text" name="newCaption" value={formInf.newCaption}
                            placeholder="Awesome article about #javascript" disabled={isDisable}
                            onChange={updateInfs} onKeyDown={onKeyPress} autoFocus
                            onFocus={focus}
                        ></textarea>
                        <button disabled={isDisable} type="submit" >
                        </button>
                    </form> :
                    <p>
                        {newCaption}
                    </p>
            }
        </DivButton>
    )
}

const DivButton = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items

    form textarea {
        width: 100%;
        height: auto;
        padding: 4px 9px;
        font-size: 14px;
        font-family: "Lato", sans-serif;
        background-color: #ffffff;
        color: #4C4C4C;
        border-radius: 7px;
        resize: none;
      }
      form button {
        display: none;
      }

`

const Delete = styled(FaTrash)`
	width: 14px;
	height: 25px;
	color: #ffffff;
	cursor: pointer;
    margin-left: 8px;
`;

const Edit = styled(TiPencil)`
	width: 18px;
	height: 25px;
	color: #ffffff;
	cursor: pointer;
`;

const modalStyle = {
    content: {
        width: '597px',
        height: 'auto',
        minHeight: '262px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#333333',
        borderRadius: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    h2: {
        maxWidth: '400px',
        fontSize: '34px',
        fontWeight: '700',
        fontFamily: '"Lato", sans-serif',
        textAlign: 'center',
        color: '#ffffff',
        marginBottom: '80px'
    },
    cancelButton: {
        width: '134px',
        height: '37px',
        marginRight: '27px',
        backgroundColor: '#ffffff',
        fontSize: '18px',
        fontWeight: '700',
        fontFamily: '"Lato", sans-serif',
        color: '#1877F2',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmButton: {
        width: '134px',
        height: '37px',
        backgroundColor: '#1877F2',
        fontSize: '18px',
        fontWeight: '700',
        fontFamily: '"Lato", sans-serif',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};