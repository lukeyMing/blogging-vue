<template>
    <div>
        <div class="van-tabs-box">
            <van-tabs v-model="activeCategory" :sticky="true" class="container" :ellipsis="false" type="card"
                      title-inactive-color="#909090" title-active-color="#2c3e50">
                <van-tab v-for="(cate, index) in categoryList" :title="cate.text" :key="index">
                    <van-pull-refresh v-model="mediaList[index].refreshing" @refresh="onRefresh(index)">
                        <van-list v-model="mediaList[index].loading" :finished="mediaList[index].finished" finished-text="no more" @load="onLoad(index)">
                            <masonry :cols="{default: 3, 1204: 3, 768: 2, 576: 1}" :gutter="{default: '15px'}">
                                <media-card v-for="(media, i) in mediaList[index].items" :key="i" :keyIndex="i" :mediaData="media"></media-card>
                            </masonry>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </div>
    </div>

</template>

<script>
    import {List, PullRefresh, Tab, Tabs} from 'vant';
    import {getAllCategoryApi, getMediaListByCategoryApi, MEDIA_HOST, MEDIA_RESOURCES} from '../../api'
    import MediaCard from '../../components/media/MediaCard'
    export default {
        data() {
            return {
                activeCategory:0,
                categoryList: [],
                mediaList:[],
                medias: {
                    items: [],
                    lastId: 0,
                    refreshing: false,
                    loading: false,
                    error: false,
                    finished: false
                }
            };
        },
        components: {
            MediaCard,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [List.name]: List,
            [PullRefresh.name]: PullRefresh,
        },
        created() {
            this.getCategory();
        },
        methods: {
            onLoad(index) {
                getMediaListByCategoryApi(this.mediaList[index].lastId, this.mediaList[index].category, 0).then((res) => {
                    this.mediaList[index].loading = false;
                    if (!res) {
                        return
                    }
                    let l = res.data.length;
                    if (l < 20) {
                        this.mediaList[index].finished = true;
                    }
                    if (l !== 0) {
                        this.mediaList[index].lastId = res.data[l - 1].LastId
                    }
                    for (let i = 0; i < l; i++) {
                        res.data[i].Medias = JSON.parse(res.data[i].Medias);
                        let mediaList = res.data[i].Medias[MEDIA_RESOURCES];
                        for (let i in mediaList) {
                            mediaList[i].MediaPath = MEDIA_HOST + mediaList[i].MediaPath;
                        }
                        res.data[i].Medias = mediaList;
                        this.mediaList[index].items.push(res.data[i]);
                    }
                })
            },
            onRefresh(index) {
                const list = this.mediaList[index];
                setTimeout(() => {
                    list.items = [];
                    list.error = false;
                    list.finished = false;
                    list.refreshing = false;
                    window.scrollTo(0, 10);
                }, 0);
            },
            getCategory() {
                getAllCategoryApi().then((res) => {
                    let category = res.data;
                    for (let i in category) {
                        this.categoryList.push({text: category[i], value: i})

                        // init list
                        this.mediaList.push({
                            items: [],
                            lastId: 0,
                            category: i,
                            refreshing: false,
                            loading: false,
                            error: false,
                            finished: false
                        })
                    }
                })
            }
        }
    };
</script>