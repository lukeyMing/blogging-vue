<template>
    <div class="home mt-fixed container-fluid">
        <van-pull-refresh v-model="medias.refreshing" @refresh="onRefresh()">
            <van-list v-model="medias.loading" :finished="medias.finished" finished-text="没有更多了" @load="onLoad">
                <masonry :cols="{default: 3, 1000: 3, 700: 2, 576: 1}" :gutter="{default: '10px', 700: '15px'}">
                    <admin-card v-for="(item, index) in medias.list"
                                :key="index" :keyIndex="index"
                                :album="item"
                                :tagList="tagList"
                                :categoryList="categoryList"
                                @delete="deleteItem"></admin-card>
                </masonry>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {List, PullRefresh, Card, DropdownMenu, DropdownItem, Tab, Tabs  } from 'vant';
    import AdminCard from '../../components/admin/card'
    import {getAdminAlbumListApi, getAdminInitApi} from '../../api/index'
    export default {
        name: 'AdminHome',
        data() {
            return {
                medias: {
                    list: [],
                    lastId: 0,
                    refreshing: false,
                    loading: false,
                    error: false,
                    finished: false
                },
                categoryList: [],
                tagList: [],
            }
        },
        components: {
            [List.name]: List,
            [Card.name]: Card,
            [PullRefresh.name]: PullRefresh,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            AdminCard,
        },
        created(){
            this.getInit()
        },
        methods: {
            onLoad() {
                getAdminAlbumListApi(this.medias.lastId, this.category, this.sort).then((res) =>{
                    if (!res) {
                        return
                    }
                    this.medias.loading = false;
                    let l = res.data.length;
                    if (l<20){
                        this.medias.finished =true;
                    }
                    if (l!==0) {
                        this.medias.lastId = res.data[l-1].Id
                    }
                    for (let i = 0; i < l; i++) {
                        this.medias.list.push(res.data[i]);
                    }
                })
            },
            onRefresh() {
                this.medias.lastId=0;
                this.medias.list = [];
                this.medias.error = false;
                this.medias.finished = false;
                this.medias.refreshing = false;
                window.scrollTo(0, 10);
            },
            getInit(){
                getAdminInitApi().then((res) =>{
                    let category = res.data.categoryList;
                    let tagList = res.data.tagList;
                    for ( let i in category) {
                        this.categoryList.push( { text: category[i], value: i })
                    }
                    for ( let j in tagList) {
                        this.tagList.push( { text: tagList[j], value: j })
                    }
                })
            },
            changeCategory(value){
                this.category=value;
                this.onRefresh();
            },
            changeSort(value){
                this.sort=value;
                this.onRefresh();
            },
            deleteItem(index){
                this.medias.list.splice(index,1);
            }
        }
    }
</script>
