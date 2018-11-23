<template>
  <div id="gallery-contents">
    <photo-cover :imgs="contents" :column="4" width="300" info="true" @click="turnToAlbum" @scroll="setFadeHeader" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'GalleryContents',
  data () {
    return {
      // album contents
      contents: [
        {
          src: '/API/assets/temp/pcontents/1.jpg',
          title: 'Album1',
          describe: 'This is album 1'
        },
        {
          src: '/API/assets/temp/pcontents/2.jpg',
          title: 'Album2',
          describe: 'This is album 2'
        },
        {
          src: '/API/assets/temp/pcontents/3.jpg',
          title: 'Album3',
          describe: 'This is album 3'
        },
        {
          src: '/API/assets/temp/pcontents/4.jpg',
          title: 'Album4',
          describe: 'This is album 4'
        },
        {
          src: '/API/assets/temp/pcontents/5.jpg',
          title: 'Album5',
          describe: 'This is album 5'
        },
        {
          src: '/API/assets/temp/pcontents/6.jpg',
          title: 'Album6',
          describe: 'This is album 6'
        },
        {
          src: '/API/assets/temp/pcontents/7.jpg',
          title: 'Album7',
          describe: 'This is album 7'
        },
        {
          src: '/API/assets/temp/pcontents/8.jpg',
          title: 'Album8',
          describe: 'This is album 8'
        },
        {
          src: '/API/assets/temp/pcontents/9.jpg',
          title: 'Album9',
          describe: 'This is album 9'
        },
        {
          title: 'Album10',
          src: '/API/assets/temp/pcontents/10.jpg',
          describe: 'This is album 10'
        }
      ]
    }
  },
  methods: {
    /**
     * @description               turn to content album
     * @return       {undefined}  no return
     */
    turnToAlbum (index) {
      const { $router, contents } = this

      $router.push(`/home/gallery/${contents[index].title}`)
    },
    ...mapMutations(['setFadeHeader'])
  },
  mounted () {
  }
}
</script>

<style lang="less">
@import url('../../assets/style/index.less');

#gallery-contents {
  width: 100%;
  height: 100%;
}
</style>
