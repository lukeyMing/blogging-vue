<template>
    <div class="home">
        <van-dropdown-menu>
            <van-dropdown-item v-model="category" :options="categoryList" @change="changeCategory"></van-dropdown-item>
            <van-dropdown-item v-model="category" :options="categoryList" @change="changeCategory"></van-dropdown-item>
            <van-dropdown-item v-model="sort" :options="sortList" @change="changeSort"></van-dropdown-item>
        </van-dropdown-menu>
        <van-pull-refresh v-model="medias.refreshing" @refresh="onRefresh()">
            <van-list v-model="medias.loading" :finished="medias.finished" finished-text="没有更多了" @load="onLoad">
                <admin-card v-for="(item, index) in medias.list" :key="index" :keyIndex="index"  :album="item" :tagList="tagList" @delete="deleteItem"></admin-card>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {List, PullRefresh, Card, DropdownMenu, DropdownItem } from 'vant';
    import AdminCard from '../../components/admin/card'
    import {getAdminAlbumListApi, getAdminInitApi} from '../../api/index'
    export default {
        name: 'AdminHome',
        data() {
            return {
                category: 0,
                sort: 0,
                categoryList: [],
                sortList: [],
                tagList: [],
                medias: {
                    list: [],
                    lastId: 0,
                    refreshing: false,
                    loading: false,
                    error: false,
                    finished: false
                }
            }
        },
        components: {
            [List.name]: List,
            [Card.name]: Card,
            [PullRefresh.name]: PullRefresh,
            AdminCard,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
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
                    let category = res.data.Category;
                    let sort = res.data.Sort;
                    for ( let i in category) {
                        this.categoryList.push( { text: category[i].Value, value: category[i].Key })
                    }
                    for ( let j in sort) {
                        this.sortList.push( { text: sort[j].Value, value: category[j].Key })
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
