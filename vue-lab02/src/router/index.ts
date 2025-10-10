import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import StudentListView from '@/views/StudentListView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import nProgress from 'nprogress'
import EventService from '@/service/EventService'
import { useEventStore } from '@/stores/event';
import { useOrganizerStore } from '@/stores/organizer';
import type { Organizer } from '@/types';
import AddEventView from '@/views/event/EventFormView.vue'
import OrganizerFormView from '@/views/event/OrganizerFormView.vue'
import OrganizerDetailView from '@/views/event/OrganizerDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: route => ({
        page: parseInt(route.query.page?.toString() || '1'),
        size: parseInt(route.query.size?.toString() || '2')
      }),
    },
    {
       //point 3.5
      path: '/event/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      beforeEnter: async (to) => {
        const id = Number(to.params.id)
        if (isNaN(id) || id <= 0) {
          return { name: '404-resource-view', params: { resource: 'event' } }
        }
        
        const eventStore = useEventStore()
        try {
          const response = await EventService.getEvent(id)
          eventStore.$patch({ currentEvent: response.data })
          return true
        } catch (error: unknown) {
          const axiosError = error as { response?: { status: number } }
          if (axiosError.response?.status === 404) {
            return { 
              name: '404-resource-view',
              params: { resource: 'event' } 
            }
          }
          return { name: 'network-error-view' }
        }
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true
        },
        {
          path: 'detail',
          name: 'event-detail-view-alt',
          component: EventDetailView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true
        },
        {
          path: 'register',
          name: 'participants-form-view',
          component: () => import('../views/event/ParticipantsListView.vue'),
          props: true
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView,
      beforeEnter: (to) => {
        try {
          const token = localStorage.getItem('access_token')
          const userRaw = localStorage.getItem('user')
          if (!token || !userRaw) return { name: 'login' }
          const user = JSON.parse(userRaw)
          if (!user?.roles || !user.roles.includes('ROLE_ADMIN')) {
            return { name: 'not-found' }
          }
          return true
        } catch (e) {
          return { name: 'login' }
        }
      }
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: OrganizerFormView,
      beforeEnter: (to) => {
        try {
          const token = localStorage.getItem('access_token')
          const userRaw = localStorage.getItem('user')
          if (!token || !userRaw) return { name: 'login' }
          const user = JSON.parse(userRaw)
          if (!user?.roles || !user.roles.includes('ROLE_ADMIN')) {
            return { name: 'not-found' }
          }
          return true
        } catch (e) {
          return { name: 'login' }
        }
      }
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    },
    {
      path: '/students',
      name: 'students',
      component: StudentListView
    },
    {
      path: '/participants',
      name: 'participants-list',
      component: () => import('@/views/event/ParticipantsListView.vue')
    },
    {
      path: '/organizer/:id',
      name: 'organizer-detail',
      component: OrganizerDetailView,
      props: true,
      beforeEnter: async (to) => {
        const id = parseInt(to.params.id as string);
        if (isNaN(id) || id <= 0) {
          return { 
            name: '404-resource-view',
            params: { resource: 'organizer' } 
          };
        }
        
        const organizerStore = useOrganizerStore();
        
        try {
          // Try to get from store first
          let organizer = organizerStore.getOrganizerById(id);
          
          // If not in store, try to load all organizers
          if (!organizer) {
            // Try to load the specific organizer directly
            try {
              const response = await import('@/service/OrganizerService').then(m => 
                m.default.getOrganizer(id)
              );
              if (response?.data) {
                const orgData = response.data as Organizer;
                organizer = orgData;
                organizerStore.addOrganizer(orgData);
              }
            } catch (error) {
              console.error('Error loading organizer:', error);
              return { name: 'network-error-view' };
            }
          }
          
          if (!organizer) {
            return { 
              name: '404-resource-view',
              params: { resource: 'organizer' } 
            };
          }
          
          organizerStore.setCurrentOrganizer(organizer);
          return true;
        } catch (error) {
          console.error('Error in organizer route guard:', error);
          return { name: 'network-error-view' };
        }
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach(() => {
  nProgress.start()
})
router.afterEach(() => {
  nProgress.done()
})

export default router