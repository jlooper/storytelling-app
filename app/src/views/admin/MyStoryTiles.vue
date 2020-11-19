<template>
  <main id="chachelis">
    <Breadcrumbs class="pl-3 pt-3" active="3" />
    <h1 class="title">Create a Layout</h1>

    <chacheli-designer-control
      :layout="layout"
      :edit-mode="editMode"
      @add="add"
      @cols="setCols"
      @rows="setRows"
      @editMode="editMode = $event"
    />
    <chacheli-designer
      v-show="editMode"
      ref="designer"
      :layout="layout"
      :chachelis="chachelis"
    />
    <chacheli-layout
      v-show="!editMode"
      :layout="layout"
      :chachelis="chachelis"
    />
  </main>
</template>
<script>
import axios from "axios";
import ChacheliDesigner from "@shellybits/v-chacheli/dist/ChacheliDesigner";
import ChacheliLayout from "@shellybits/v-chacheli/dist/ChacheliLayout";
import ChacheliDesignerControl from "@/components/ChacheliDesignerControl";
import Breadcrumbs from "@/components/Breadcrumbs";
import LayoutChacheli from "@/layouts/LayoutChacheli.vue";

export default {
  name: "storylayout",
  data() {
    return {
      loading: false,
      isStatic: false,
      storyItems: [],
      idCounter: 0,
      layout: {
        cols: 2,
        rows: 3,
      },
      editMode: true,
      chachelis: [],

      data: {
        1: { content: "some text" },
        2: { content: "some text 2" },
        3: { content: "some text 3" },
        4: { content: "some text 4" },
      },
    };
  },
  components: {
    Breadcrumbs,
    ChacheliDesignerControl,
    ChacheliDesigner,
    ChacheliLayout,
  },
  created() {
    this.$emit(`update:layout`, LayoutChacheli);

    axios
      .post("/api/getAdminStoryItems", { id: this.$route.params.id })
      .then((response) => {
        if (response.status === 200) {
          this.storyItems = response.data;
          console.log(this.storyItems);
          for (var i = 0; i < this.storyItems.length; i++) {
            let content = "";
            if (!this.storyItems[i].title) {
              content = this.storyItems[i].type;
            } else {
              content =
                this.storyItems[i].title +
                ", " +
                this.storyItems[i].description;
            }
            this.chachelis.push({
              id: this.storyItems[i].id,
              x: 0 + i,
              y: 2,
              w: 1,
              h: 1,
              i: this.storyItems[i].id,
              title: this.storyItems[i].title || "",
              desc: this.storyItems[i].description || "",
              image: this.storyItems[i].image || "",
              medium: this.storyItems[i].medium || "",
              provenance: this.storyItems[i].provenance || "",
              artist: this.storyItems[i].artist || "",
              date: this.storyItems[i].date || "",
              content: this.storyItems[i].content || "",
              type: this.storyItems[i].type || "",
              collection: this.storyItems[i].collection || "",
              text: content,
              available: true,
            });
          }
        } else {
          this.error = true;
        }
      })
      .catch((err) => {
        this.error = err;
      });
  },
  methods: {
    htmlDecode(input) {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    },
    add(props, data) {
      let c = Object.assign(
        {
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          text: "",
          available: true,
        },
        props
      );

      c.x = parseInt(c.x);
      c.y = parseInt(c.y);
      c.w = parseInt(c.w);
      c.h = parseInt(c.h);

      c.id = this.idCounter++;
      this.chachelis.push(c);

      this.data[c.id] = data;
    },
    setCols(v) {
      if (v >= this.$refs.designer.minColumns() && v <= 15)
        this.layout.cols = v;
    },
    setRows(v) {
      if (v >= this.$refs.designer.minRows() && v <= 15) this.layout.rows = v;
    },
  },
};
</script>
