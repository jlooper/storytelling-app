<template>
  <div class="wrapper">
    <div class="pane">
      <h1 class="huge">Amazing Antimacassars</h1>
      <h2>Protecting chair backs since the Victorian era</h2>
      <p>Practical and Pretty</p>
      <a
        href="#"
        class="next-page"
        v-scroll-to="{
          el: '#second',
          duration: 500,
          lazy: false,
          easing: 'ease-in',
          cancelable: true,
          onDone: zoom,
          onStart: unzoom,
          x: false,
          y: true,
        }"
        >Next</a
      >
    </div>
    <div class="content pane">
      <img src="../assets/antimacassar.jpg" />
    </div>
    <!--2-->

    <div class="pane">
      <h2>Linen or Cotton?</h2>
      <p>
        Glossier chartreuse meh actually raclette, wayfarers lomo microdosing
        etsy paleo whatever yr. Keytar put a bird on it street art hammock
        authentic etsy adaptogen, try-hard small batch slow-carb. Irony schlitz
        tacos street art selvage portland venmo etsy raclette snackwave fanny
        pack. Banh mi scenester plaid lumbersexual trust fund shabby chic pug
        banjo iceland locavore cornhole organic prism cloud bread. Brunch
        locavore raw denim knausgaard raclette. Single-origin coffee tattooed
        tofu shabby chic ethical affogato trust fund.
      </p>
      <p>
        "Tofu shaman la croix occupy four dollar toast vaporware. Vice subway
        tile VHS disrupt. Lo-fi kombucha pop-up, meditation plaid next level
        bushwick brooklyn shabby chic forage kickstarter. Ethical tbh tilde,
        schlitz retro umami air plant freegan tattooed seitan iPhone blue bottle
        whatever. Post-ironic marfa poutine flexitarian. Wayfarers taiyaki
        helvetica mustache shoreditch vape glossier lomo 3 wolf moon tote bag. "
      </p>
      <a
        href="#"
        class="next-page"
        v-scroll-to="{
          el: '#third',
          duration: 500,
          lazy: false,
          easing: 'ease-in',
          cancelable: true,
          onDone: zoom,
          onStart: unzoom,
          x: false,
          y: true,
        }"
        >Next</a
      >
    </div>

    <div id="second" class="content pane">
      <img :style="scrolly" src="../assets/antimacassar.jpg" />
    </div>
    <!--third-->

    <div class="pane">
      <h2>DIY</h2>
      <p>
        Whatever knausgaard readymade lomo try-hard. Vexillologist air plant
        tumblr chicharrones schlitz you probably haven't heard of them health
        goth knausgaard humblebrag pork belly tattooed cliche cred. Yuccie
        edison bulb taxidermy +1 adaptogen. Craft beer leggings venmo, raw denim
        normcore bicycle rights vice.
      </p>
      <a
        href="#"
        class="next-page"
        v-scroll-to="{
          el: '#fourth',
          duration: 500,
          lazy: false,
          easing: 'ease-in',
          cancelable: true,
          onDone: zoom,
          onStart: unzoom,
          x: false,
          y: true,
        }"
        >Next</a
      >
    </div>

    <div id="third" class="content pane">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube-nocookie.com/embed/ZtT8K-wZ0Og"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sample",
  data() {
    return {
      scrolly: "",
    };
  },

  methods: {
    zoom() {
      this.scrolly = "transform: scale(5)";
    },
    unzoom() {
      this.scrolly = "";
    },
  },
};
</script>
<style scoped>
.wrapper {
  display: grid;
  width: 100%;
  margin: auto;
  grid-gap: 10px;
  grid-template-columns: 50% 50%;
}
.pane {
  height: 100vh;
}
.content,
.content2,
.content-sm {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  cursor: pointer;
}
.content3 {
  overflow: hidden;
  cursor: pointer;
}
.content-sm img {
  height: 70vh;
  transform-origin: 35% 30%;
  transition: transform 1s, filter 1s ease-out;
}
.content img {
  height: 100vh;
  transform-origin: 85% 50%;
  transition: transform 1s, filter 1s ease-out;
}
.content2 img {
  height: 100vh;
  transform-origin: 40% 50%;
  transition: transform 1s, filter 1s ease-out;
}
.content3 img {
  transform-origin: 10% 2%;
  transition: transform 1s, filter 1s ease-out;
}

.content4 img {
  transform-origin: 10% 2%;
  transition: transform 1s, filter 1s ease-out;
}
/* The Transformation */

.content:hover img {
  /*transform: scale(5);*/
}

h2 {
  font: normal 3.5em/1em georgia, serif;
  margin-bottom: 0.75em;
  padding: 20px;
}
h1.huge {
  font: normal 5em georgia, serif;
  position: relative;
  top: -0.2em;
  padding: 20px;
}
p {
  font: normal 1.5em/1em georgia, serif;
  margin-bottom: 0.75em;
  padding: 20px;
}
.next-page {
  display: inline-block;
  text-decoration: none;
  padding: 1em 0.75em;
  margin: 20px;
  border-radius: 5em;
  z-index: 2000;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  color: red;
  background: white;
}
</style>
