const routes = [
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('pages/Login.vue')
        },
        {
          path: 'user',
          name: 'User',
          component: () => import('pages/User.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('pages/Home.vue'),
            meta: {
                requiresAuth: true
              }
          },
          {
            path: '/feed',
            name: 'Feed',
            component: () => import('pages/Feed.vue'),
            meta: {
                requiresAuth: true
              }
          },
          {
            path: '/messenger',
            name: 'Messenger',
            component: () => import('pages/Messenger.vue'),
            meta: {
                requiresAuth: true
              }
          },
          {
            path: '/notifications',
            name: 'Notifications',
            component: () => import('pages/Notifications.vue'),
            meta: {
                requiresAuth: true
              }
          },
          {
            path: '/friends',
            name: 'Friends',
            component: () => import('pages/Friends.vue'),
            meta: {
                requiresAuth: true
              }
          },
          {
            path: '/photos',
            name: 'Photos',
            component: () => import('pages/Photos.vue'),
            meta: {
                requiresAuth: true
              }
          },
          {
            path: '/edit-profile',
            name: 'EditProfile',
            component: () => import('pages/EditProfile.vue'),
            meta: {
                requiresAuth: true
              }
          },
          {
            path: '/about',
            name: 'About',
            component: () => import('pages/About.vue')
          },
      ]
    },
  ]
  
  // Always leave this as last one
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
  
  export default routes