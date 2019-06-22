<template>
    <div class="card">
        <van-image  fit="contain" :src="album.Cover"></van-image>

        <div class="card-body">
            <p class="card-text">{{album.Title}}</p>
        </div>
        <div class="card-bottom">
            <van-cell-group class="handle">
                <van-radio-group v-model="categoryValue">
                    <span class="tag-box" v-for="(category, index) in categoryList" :key="index">
                        <van-radio    :name="category.value" >{{ category.text }}</van-radio>
                    </span>
                </van-radio-group>
            </van-cell-group>
            <van-cell-group class="handle">
                <van-checkbox-group v-model="tagValue">
                    <span class="tag-box" v-for="(tag, index) in tagList" :key="index">
                        <van-checkbox shape="square"  :key="tag.value" :name="tag.value" >{{ tag.text }}</van-checkbox>
                    </span>
                </van-checkbox-group>
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="desc" placeholder="enter title"></van-field>
            </van-cell-group>
            <van-cell-group class="handle">
                <van-button :loading="delLoading"  loading-type="spinner" type="default" size="small" @click="deleteAlbum" >delete</van-button>
                <van-button :loading="pubLoading" loading-type="spinner" class="submit" type="warning" size="small" @click="publishAlbum">submit</van-button>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import { Image ,Checkbox, CheckboxGroup , Button, Field, CellGroup , RadioGroup, Radio} from 'vant';
    import {publishAlbumApi, deleteAlbumApi} from '../../api/index'
    export default {
        props: ['album', 'tagList', 'categoryList', 'keyIndex'],
        data(){
            return {
                delLoading: false,
                pubLoading: false,
                tagValue:[],
                categoryValue:0,
                desc: "",
            }
        },
        components: {
            [Image.name]: Image,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Radio.name]: Radio,
            [RadioGroup.name]: RadioGroup,
            [Button.name]: Button,
            [Field.name]: Field,
            [CellGroup.name]: CellGroup,
        },
        methods: {
            deleteAlbum(){
                if (this.delLoading) {
                    return
                }
                this.delLoading = true;
                console.log(this.album.Id)
                deleteAlbumApi(this.album.Id).then((res)=>{
                    this.delLoading = false;
                    this.$emit("delete", this.keyIndex)
                })
            },
            publishAlbum(){
                if (this.pubLoading) {
                    return
                }
                this.pubLoading = true;
                console.log(this.album.Id);
                let tags = this.tagValue.join(",");
                publishAlbumApi(this.album.Id, this.album.Cover, this.desc, tags, 1, this.categoryValue).then((res)=>{
                    this.pubLoading = false;
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
