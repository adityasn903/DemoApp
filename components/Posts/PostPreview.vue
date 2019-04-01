<template>
  <nuxt-link to='/postDetails'>
    <article>
      <div class="post-content">
        <h1>{{ authorName }}</h1>
        <h6> posted on : {{ myDate() }} | {{ myTime() }} </h6>
        <h3>{{ title }}</h3>
        <p> {{ description }} </p>
        <hr />
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: 'PostPreview',
  props: {
    id: {
      type: String,
      required: true
    },
    postedOn: {
      required: true
    },
    title: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      postedDate:'',
      postedTime:''
    }
  },
  methods:{
      myDate(){
        var var1 = this.postedOn.split('T');
        //return this.postedDate = this.postedOn.split("T.")[0] +" " + this.postedOn.split("T.")[1];
         this.postedDate = var1[0];
         return this.postedDate;
      },
      myTime(){
        var var1 = this.postedOn.split('T');
        var var2 = var1[1].split('.')[0];

        //return this.postedDate = this.postedOn.split("T.")[0] +" " + this.postedOn.split("T.")[1];
         this.postedTime = var2;
         return this.postedTime;
      }
    }
  }
</script>


<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>
