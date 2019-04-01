<template>
  <section class="post-list">
    <PostPreview
      v-for="post in posts"
      :key="post._id"
      :id="post._id"
      :title="post.title"
      :authorName="post.authorName"
      :description="post.description"
      :postedOn="post.postedOn"
       />
  </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components: {
    PostPreview
  },
  props: {
    posts: {
    }
  }
}
</script>


<style scoped>

.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

