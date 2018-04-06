import Home from 'material-ui-icons/Home';
import QuestionAnswer from 'material-ui-icons/QuestionAnswer';
import LocalPostOffice from 'material-ui-icons/LocalPostOffice';
import Chat from 'material-ui-icons/Chat';

export default [
  {
    name: 'Home',
    icon: Home,
    linkTo: '/'
  },
  {
    name: 'Stackoverflow',
    icon: QuestionAnswer,
    linkTo: '/stackoverflow'
  },
  {
    name: 'Posts',
    icon: LocalPostOffice,
    linkTo: '/posts'
  },
  {
    name: 'Chat',
    icon: Chat,
    linkTo: '/chat'
  }
];
