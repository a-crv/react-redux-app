import Home from '@material-ui/icons/Home';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import LocalPostOffice from '@material-ui/icons/LocalPostOffice';
import Chat from '@material-ui/icons/Chat';
import FiberDvr from '@material-ui/icons/FiberDvr';


export default [
  {
    id: 0,
    name: 'Home',
    icon: Home,
    linkTo: '/'
  },
  {
    id: 1,
    name: 'Stackoverflow',
    icon: QuestionAnswer,
    linkTo: '/stackoverflow'
  },
  {
    id: 2,
    name: 'Posts',
    icon: LocalPostOffice,
    linkTo: '/posts'
  },
  {
    id: 3,
    name: 'Chat',
    icon: Chat,
    linkTo: '/chat'
  },
  {
    id: 4,
    name: 'Animation',
    icon: FiberDvr,
    linkTo: '/animation'
  }
];
