import NoticeAccordion from './NoticeAccordion';

export default function ClassNotice({ isTeacher, notices }) {
  return (
    <>
      <NoticeAccordion notices={notices} isTeacher={isTeacher} />
    </>
  );
}
