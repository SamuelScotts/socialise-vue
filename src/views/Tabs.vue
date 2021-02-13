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

        <ion-button size="large" color="black" @click="$router.push('/messages')">
          <ion-icon :icon="mail" />
        </ion-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonButton, IonTabs, IonIcon, IonPage } from '@ionic/vue';
import { home, people, add, chatbox, mail } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonTabs, IonTabBar, IonButton, IonIcon, IonPage },
  setup() {
    return {
      home,
      people,
      add,
      chatbox,
      mail
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