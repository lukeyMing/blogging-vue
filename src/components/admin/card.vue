<template>
    <div class="card">
        <van-image  fit="contain" :src="album.Cover"></van-image>

        <div class="card-body">
            <p class="card-text">{{album.Title}}</p>
        </div>
        <div class="card-bottom">
            <van-cell-group>
                <van-field v-model="desc" placeholder="enter title"></van-field>
            </van-cell-group>
            <van-cell-group class="handle">
                <van-checkbox-group v-model="tagValue">
                    <span class="tag-box" v-for="(item, index) in tagList" :key="index">
                        <van-checkbox :key="item" :name="item" >{{ item }}</van-checkbox>
                    </span>
                </van-checkbox-group>
            </van-cell-group>
            <van-cell-group class="handle">
                <van-button :loading="loading"  loading-type="spinner" type="default" size="small" @click="deleteAlbum" >delete</van-button>
                <van-button :loading="loading" loading-type="spinner" class="submit" type="warning" size="small" @click="publishAlbum">submit</van-button>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import { Image ,Checkbox, CheckboxGroup , Button, Field, CellGroup } from 'vant';
    import {publishAlbumApi, deleteAlbumApi} from '../../api/index'
    export default {
        props: ['album', 'tagList', 'keyIndex'],
        data(){
            return {
                loading: false,
                tags : ["wedding", "wedding ideas", "wedding outdoor", "wedding color"],
                tagValue:[],
                desc: "",
            }
        },
        components: {
            [Image.name]: Image,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Button.name]: Button,
            [Field.name]: Field,
            [CellGroup.name]: CellGroup,
        },
        methods: {
            deleteAlbum(){
                if (this.loading) {
                    return
                }
                this.loading = true;
                console.log(this.album.Id)
                deleteAlbumApi(this.album.Id).then((res)=>{
                    this.loading = false;
                    this.$emit("delete", this.keyIndex)
                })
            },
            publishAlbum(){
                if (this.loading) {
                    return
                }
                this.loading = true;
                console.log(this.album.Id);
                let tags = this.tagValue.join(",");
                publishAlbumApi(this.album.Id, this.album.Cover, this.desc, tags, 1).then((res)=>{
                    this.loading = false;
                    this.$emit("delete", this.keyIndex)
                })

            }
        }
    }
</script>

<style scoped>
    .tag-box {margin: 0.2rem ;display: inline-block;}
    .submit {margin-left: 1em;}
    .handle {padding: 0.6em}
</style>
