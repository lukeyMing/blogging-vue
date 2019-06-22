<template>
    <div >
        <div class="van-tabs-box">
            <van-tabs :sticky="true" @scroll="stick" @change="changeCategory" class="container" :ellipsis="false" type="card"
                      title-inactive-color="#909090" title-active-color="#2c3e50">
                <van-tab v-for="(cate, index) in categoryList" :title="cate.text" :key="index">
                    <van-pull-refresh v-model="medias.refreshing" @refresh="onRefresh">
                        <van-list v-model="medias.loading" :finished="medias.finished" finished-text="no more" @load="onLoad">
                            <masonry :cols="{default: 3, 1204: 3, 768: 2, 576: 1}" :gutter="{default: '15px'}">
                                <media-card v-for="(media, index) in medias.items" :key="index" :keyIndex="index" :mediaData="media"></media-card>
                            </masonry>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </div>

    </div>

</template>

<script>
    import {Cell, DropdownItem, DropdownMenu, Image, List, PullRefresh, Tab, Tabs} from 'vant';
    import {getAllCategoryApi, getMediaListByCategoryApi, MEDIA_HOST, MEDIA_RESOURCES} from '../../api'
    import MediaCard from '../../components/media/MediaCard'
    export default {
        data() {
            return {
                categoryList: [{text:"All", value: 0}],
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
            [Cell.name]: Cell,
            [PullRefresh.name]: PullRefresh,
            [Image.name]: Image
        },
        created() {
            this.getCategory();
        },
        methods: {
            onLoad() {
                getMediaListByCategoryApi(this.medias.lastId, this.category, this.sort).then((res) => {
                    this.medias.loading = false;
                    if (!res) {
                        return
                    }
                    let l = res.data.length;
                    if (l < 20) {
                        this.medias.finished = true;
                    }
                    if (l !== 0) {
                        this.medias.lastId = res.data[l - 1].LastId
                    }
                    for (let i = 0; i < l; i++) {
                        res.data[i].Medias = JSON.parse(res.data[i].Medias);
                        let mediaList = res.data[i].Medias[MEDIA_RESOURCES];
                        for (let i in mediaList) {
                            mediaList[i].MediaPath = MEDIA_HOST + mediaList[i].MediaPath;
                        }
                        res.data[i].Medias = mediaList;
                        this.medias.items.push(res.data[i]);
                    }
                })
            },
            onRefresh() {
                const list = this.medias;
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
                    }
                })
            },
            changeCategory(index) {
                this.category = this.categoryList[index].value;
                this.onRefresh();
            },
            stick(scrollTop, isFixed){
                console.log(scrollTop, isFixed)
            }
        }
    };
</script>