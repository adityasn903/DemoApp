<template>
  <div class="container">
  	<div class="card-body">
  	<form @submit.prevent="createPost">
	<span class="badge badge-pill badge-info" style='{padding: 10px}'>Hi There! Create A Post Here</span>
       <div class="input-container">
          <input
            class="form-control"
            v-validate="'required'"
            type="text"
            name="title"
            v-model="post.title"
            placeholder="Enter Title"
          >
        </div>
		<div class="input-container">
          <textarea
            class="form-control"
            v-validate="'required'"
            type="text"
            rows="4"
            name="description"
            v-model="post.description"
            placeholder="Enter the details of the post"
          />
        </div>
        <button
        	type="submit"
            class="btn btn-primary"
            style="width:110px;"
          >Create Post</button>
          
	  </form>
    <button
            type="click"
            class="btn btn-danger"
            style="width:80px;"
            @click='onCancel'
          >Cancel</button>
</div>
</div>
</template>

<script>

export default {
  middleware: 'auth',
  created(){
    if(this.$store.state.authUser == null){
      this.$router.push('/')
    }

  },data() {
  	return{
  		post:{
        authorName:'',
  			title:'',
  			description:'',
  			postedOn:''
  		}
  	}
  },
  methods: {
    createPost() {
      this.post.postedOn = new Date(); 
      this.post.authorName = this.$store.state.authUser.fullName;
      //console.log(this.post);
      this.$store.dispatch("addPost", this.post);
      this.$router.push("/user");
    },
    onCancel() {
      this.$router.push("/user");
    }
  }
};	
</script>

<style scoped>
.input-container {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  margin-bottom: 10px;
  margin-top: 20px;
}
.container {
  border-radius: 5px;
  background: #e0e0e0;
  padding: 30px;
  margin-top: 100px;
  max-width: 600px;
  width: 500px;
}
.input-container input[type="text"],
[type="password"],
[type="number"] {
  padding-left: 40px;
}
.input-container {
  position: relative;
}
.input-container i {
  position: absolute;
  left: 0;
  top: 6px;
  padding: 5px 15px;
  color: #aaa;
  transition: 1s;
}
</style>