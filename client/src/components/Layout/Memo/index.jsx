import * as React from 'react';
import { Stack, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateMemo from './CreateMemo';
import MemoList from './MemoList';
import MemoListItem from './MemoListItem';
import axios from 'axios';

export default function Memo({closeMemo}){
    const [memos, setMemos] = React.useState([]);

    const [selectedMemoId, setSelectedMemoId] = React.useState('');
    const [isCreateMemoVisible, setCreateMemoVisible] = React.useState(false);
    const [isModifyMemo, setIsModifyMemo] = React.useState(false);
    const [inputTitle, setInputTitle] = React.useState('');
    const [modifyId, setModifyId] = React.useState();
    const [inputContent, setInputContent] = React.useState('');

    function onClickDelete(memoId){
        // 추후 삭제 요청
        const CopyMemos = memos.filter(item => item.id !== memoId);
        setMemos(CopyMemos);
    }
    function getMemos(){
        axios.get(`http://localhost:8081/memos`,{ withCredentials: true }).then(data=>{
            setMemos(data.data);
        }).catch(err=>{
            console.log(err);
        })
    }
    function onClickHandler(id) {
        setSelectedMemoId(id);
    };
    function rewind(){
        setSelectedMemoId('');
    };
    function handleModifyClick(){
        setIsModifyMemo(true);
    }
    const handleCreateMemoClick = () => {
        setCreateMemoVisible(true);
        setSelectedMemoId(''); // Close selected memo if open
    };
    const handleSaveClick = () => {
        if(isModifyMemo){
            const data = {
                title: inputTitle,
                content: inputContent
            };
            axios.put(`http://localhost:8081/memo?id=${modifyId}`,data,{ withCredentials: true }).then(()=>{
                const CopyMemos = memos.map(item=>{ return item.id === modifyId? {...item, title:inputTitle, content: inputContent}: item;})
                setMemos(CopyMemos);
                setCreateMemoVisible(false);
                setIsModifyMemo(false);
                setModifyId(null);
            }).catch(err=>{
                console.log(err);
            })
        }else{
            const data = {
                title: inputTitle,
                content: inputContent
            };
            axios.post(`http://localhost:8081/memo?`,data,{ withCredentials: true }).then(()=>{
                setMemos([{...data, createdAt: new Date()}, ...memos])
                setCreateMemoVisible(false);
            }).catch(err=>{
                console.log(err);
            })
        }

    };

    React.useEffect(()=>{
        getMemos();
    },[])

    return(
        <Stack sx={{
            width: 456,
            height: 373,
            flexShrink:0,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            bottom: 0,
            right: 0,
            background: '#b3e5fc',
            borderRadius:'20px',
          }}>
            <Stack>
            <Stack sx={{textAlign:'right', display:'inline-block'}}>
                <CloseIcon onClick={closeMemo} sx={{
                    cursor:'pointer',
                    margin:'10px',
                    color:'black',
                    '&:hover':{transform:'scale(1.1)'},
                }} />
            </Stack>
                {selectedMemoId !== '' ? (
                    <MemoListItem memo={memos.find(memo => memo.id === selectedMemoId)} rewind={rewind}
                     setInputTitle={setInputTitle}
                     setInputContent={setInputContent}
                     handleModifyClick={handleModifyClick}
                     setModifyId={setModifyId} 
                     setCreateMemoVisible={setCreateMemoVisible}
                     setSelectedMemoId={setSelectedMemoId}/>
                  ) : isCreateMemoVisible ? (
                    <CreateMemo isModifyMemo = {isModifyMemo} setCreateMemoVisible ={setCreateMemoVisible} inputTitle={inputTitle} inputContent={inputContent} setInputTitle={setInputTitle} setInputContent={setInputContent}/>
                  ) : (
                    <MemoList memos={memos} onClickHandler={onClickHandler} onClickDelete={onClickDelete} />
                  )}
            </Stack>
            <Button variant='outlined' sx={{
                    width:'88%',
                    margin:'20px 30px',
                    padding:'10px 30px',
                    flexShrink:0,
                    borderRadius:'20px',
                    height:35,
                    position:'absolute',
                    bottom:0,
                }} onClick={isCreateMemoVisible ? handleSaveClick : handleCreateMemoClick}>
                {isCreateMemoVisible ? '저장': '새 메모 만들기'}
            </Button>            
        </Stack>
    );
};