<template>
  <ion-page>
    <ion-tabs>
      
      <ion-tab-bar slot="bottom">

        <ion-button size="large" color="black" @click="$router.push('/stories')">
          <ion-icon :icon="home" />
        </ion-button>
          
        <ion-button size="large" color="black" @click="$router.push('/groups')">
          <ion-icon :icon="people" />
        </ion-button>
        
        <ion-button size="large" color="black" @click="$router.push('/add')">
          <ion-icon :icon="add" />
        </ion-button>

        <ion-button size="large" color="black" @click="$router.push('/chat')">
          <ion-icon :icon="chatbox" />
        </ion-button>

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
    notifications: 0,
  }),
  setup() {
    return {
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
::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none;
}
</style>