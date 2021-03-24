<template>
  <v-container>
    <div v-for="meme in memes" :key="meme.id" class="py-5">
      <meme
        class="mx-auto"
        :top="meme.topText"
        :bottom="meme.bottomText"
        :imageURL="meme.imageURL"
      />
    </div>
  </v-container>
</template>

<script>
import { db } from "../firebase";
import Meme from "../components/Meme";

export default {
  data() {
    return {
      memes: [],
    };
  },
  components: {
    Meme,
  },
  mounted() {
    db.collection("memes").onSnapshot((snap) => {
      const memes = snap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      this.memes = memes;
    });
  },
  beforeDestroy() {
    console.log("Create component about to be destroyed");
  },
};
</script>

<style></style>