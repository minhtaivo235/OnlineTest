interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'usertype',
    url: '/usertype',
    icon: 'fa fa-hashtag'
  },
  {
    name: 'user',
    url: '/user',
    icon: 'fa fa-hashtag'
  },
  {
    name: 'taker',
    url: '/taker',
    icon: 'fa fa-hashtag'
  },
  {
    name: 'grouptest',
    url: '/grouptest',
    icon: 'fa fa-hashtag'
  },
  {
    name: 'lab',
    url: '/listquestion',
    icon: 'fa fa-hashtag'
  },
  {
    name: 'semester',
    url: '/semester',
    icon: 'fa fa-hashtag'
  },
  {
    name: 'part',
    url: '/part',
    icon: 'fa fa-hashtag'
  },
  {
    name: 'listquestion',
    url: '/listquestion',
    icon: 'fa fa-hashtag'
  },
  {
    name: 'test',
    url: '/test',
    icon: 'fa fa-hashtag'
  },
  {
    name: 'test_type',
    url: '/test_type',
    icon: 'fa fa-hashtag'
  },
  {
    name: 'subject',
    url: '/subject',
    icon: 'fa fa-hashtag'
  },
  {
    name: 'Group',
    url: '/group',
    icon: 'fa fa-object-group'
  },
  {
    name: 'Lab',
    url: '/lab',
    icon: 'fa fa-flask'
  },
  {
    name:'Privilege',
    url:'/privilege',
    icon: 'fa fa-hashtag'

  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  }
];
