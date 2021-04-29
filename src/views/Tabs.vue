<template>
  <ion-page>
    <ion-tabs>
      <!-- Navigation tabs, which are consistant throughout app, at footer -->
      <ion-tab-bar slot="bottom">
        
        <!-- Link to stories view -->
        <ion-button size="large" color="black" @click="$router.push('/stories')">
          <ion-icon :icon="home" />
        </ion-button>

         <!-- Link to faculties/groups view --> 
        <ion-button size="large" color="black" @click="$router.push('/groups')">
          <ion-icon :icon="people" />
        </ion-button>
        
        <!-- Link to add story view -->
        <ion-button size="large" color="black" @click="$router.push('/add')">
          <ion-icon :icon="add" />
        </ion-button>

        <!-- Link to chat view -->
        <ion-button size="large" color="black" @click="$router.push('/chat')">
          <ion-icon :icon="chatbox" />
        </ion-button>

        <!-- Link to notifications view -->
        <ion-button size="large" color="black" @click="$router.push('/notifications')">
          <ion-badge v-if="notifications >= 1" style="margin-left: -15px; margin-top: -20px;" color="danger" slot="end">{{notifications}}</ion-badge><ion-icon :icon="notificationsOutline" />
        </ion-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonButton, IonTabs, IonIcon, IonPage, IonBadge } from '@ionic/vue';
import { home, people, add, chatbox, notificationsOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonTabs, IonTabBar, IonButton, IonIcon, IonPage, IonBadge },
  data: () => ({
    // Set notifications to 0
    notifications: 0,
  }),
  setup() {
    return {
      // Icon image references
      home,
      people,
      add,
      chatbox,
      notificationsOutline
    }
  }
}
</script>

<style scoped>
ion-icon {
  color: #FFFFFF;
}
ion-button{
  --box-shadow:none;
}
/* Remove scroll bar across app */
::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none;
}
</style>