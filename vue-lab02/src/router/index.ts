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
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
        .then((response) => {
        eventStore.setEvent(response.data)
        return true
        }).catch(error => {
          if (error.response && error.response.status === 404) {
            return { name: '404-resource-view',
               params: { resource: 'event' } 
              }
          } else{
            return { name: 'network-error-view'}
          }
        })
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
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: OrganizerFormView
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
