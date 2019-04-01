<template>
  <section class="post-list">
    <div>
      <PostPreview
      v-for="post in posts"
      :key="post._id"
      :id="post._id"
      :title="post.postTitle"
      :authorName="post.authorName"
      :description="post.postDescription"
      :postedOn="post.postedDate"
      />
    </div>
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
  display: block;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

