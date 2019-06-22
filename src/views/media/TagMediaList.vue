<template>
 <div>
     <mut-tags :tags="tags" @click="loadTags"></mut-tags>
 </div>
</template>
<script>
    import {List, PullRefresh, Tab, Tabs} from 'vant';
    import {getAllTagApi, getMediaListByCategoryApi, MEDIA_HOST, MEDIA_RESOURCES} from '../../api'
    import MutTags from '../../components/tag/MutTags.vue'

    export default {
        data() {
            return {
                tagsActiveValue:[],
                tags: [],
                isLoading: false
            }
        },
        components: {
            MutTags,
            [PullRefresh.name]: PullRefresh,
        },
        created() {
            this.getTags();
        },
        methods: {
            getTags() {
                getAllTagApi().then((res) => {
                    for (let i in res.data) {
                        this.tags.push({text: res.data[i], value: i})
                    }
                });
                console.log(this.tags)

            },
            loadTags(tagValue){
                console.log(tagValue)
            }
        }
    }
</script>

<style scoped>

</style>