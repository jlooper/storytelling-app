<template>
  <section>
    <b-field grouped group-multiline>
      <button
        class="button field is-danger"
        @click="checkedRows = []"
        :disabled="!checkedRows.length"
      >
        <b-icon icon="close"></b-icon>
        <span>Clear checked</span>
      </button>
    </b-field>

    <b-tabs>
      <b-tab-item label="Table">
        <b-table
          :data="CooperHewittMuseumObjects"
          :columns="columns"
          :checked-rows.sync="checkedRows"
          :is-row-checkable="(row) => row.id !== 3 && row.id !== 4"
          checkable
          draggable
          :opened-detailed="defaultOpenedDetails"
          detailed
          detail-key="id"
          :show-detail-icon="showDetailIcon"
          :checkbox-position="checkboxPosition"
        >
          <template slot="detail">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="http://placekitten.com/200/200" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin ornare magna eros, eu pellentesque tortor vestibulum
                    ut. Maecenas non massa sem. Etiam finibus odio quis feugiat
                    facilisis.
                  </p>
                </div>
              </div>
            </article>
          </template>

          <template slot="bottom-left">
            <b>Total checked</b>: {{ checkedRows.length }}
          </template>
        </b-table>
      </b-tab-item>
    </b-tabs>
  </section>
</template>
<script>
var axios = require("axios");

export default {
  data() {
    return {
      CooperHewittMuseumObjects: [],
      checkboxPosition: "left",
      isRowCheckable: true,
      defaultOpenedDetails: [1],
      showDetailIcon: true,
      checkedRows: [],
      columns: [
        {
          field: "title",
          label: "Title",
          centered: true,
        },
        {
          field: "medium",
          label: "Medium",
        },
        {
          field: "accession_number",
          label: "Accession Number",
        },
        {
          field: "creditline",
          label: "Credits",
          centered: true,
        },
        {
          field: "year_acquired",
          label: "Year Acquired",
          centered: true,
        },
      ],
    };
  },

  methods: {
    async startSearch(value) {
      var chconfig = {
        method: "get",
        url:
          "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects",
        headers: {},
        params: {
          access_token: "5a3c42c653014805fd1e06902631596f",
          query: value,
          page: 1,
          per_page: 10,
        },
      };
      try {
        const response = await axios(chconfig);
        this.CooperHewittMuseumObjects = response.data.objects;
        console.log(this.CooperHewittMuseumObjects);
      } catch (error) {
        console.error(error);
      }
    },
    createStoryItem(object) {
      axios
        .post("/api/createStoryItem", {
          storyId: this.$route.params.id,
          image: object.images[0].b.url,
          title: object.title,
          label: object.label_text,
          description: object.description,
          type: object.type,
          medium: object.medium,
          url: object.url,
          date: object.date,
          acquired: object.year_acquired,
          collection: "Cooper Hewitt",
        })

        .then((response) => {
          if (response.data.errorMessage == null) {
            this.$buefy.toast.open(response.data.message);
          } else {
            this.$buefy.toast.open(response.data.errorMessage);
          }
        })
        .catch(function (error) {
          this.$buefy.toast.open(error);
        });
    },
  },
  created() {
    this.$parent.$parent.$on("search", this.startSearch);
  },
};
</script>

<style scoped>
.image img {
  width: auto;
  max-height: 200px;
}
</style>
