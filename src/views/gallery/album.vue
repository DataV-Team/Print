<template>
  <div id="album">
    <photo-cover :imgs="albums" :column="3" width="400" />
  </div>
</template>

<script>
export default {
  name: 'Album',
  props: ['album'],
  data () {
    return {
      albums: [
        {
          src: '/API/assets/temp/school/1.jpg'
        },
        {
          src: '/API/assets/temp/school/2.jpg'
        },
        {
          src: '/API/assets/temp/school/14.png'
        },
        {
          src: '/API/assets/temp/school/4.jpg'
        },
        {
          src: '/API/assets/temp/school/5.jpg'
        },
        {
          src: '/API/assets/temp/school/6.jpg'
        },
        {
          src: '/API/assets/temp/school/7.jpg'
        },
        {
          src: '/API/assets/temp/school/8.jpg'
        },
        {
          src: '/API/assets/temp/school/9.jpg'
        },
        {
          src: '/API/assets/temp/school/10.jpg'
        },
        {
          src: '/API/assets/temp/school/11.jpg'
        },
        {
          src: '/API/assets/temp/school/12.jpg'
        },
        {
          src: '/API/assets/temp/school/13.jpg'
        }
      ]
    }
  },
  methods: {
  },
  created () {
    console.error(this.album)
  }
}
</script>

<style lang="less">
@import url('../../assets/style/index.less');

#album {
  width: 100%;
  height: 100%;
}
</style>
