<template>
    <div class="card">
        <div v-if="mediaData.Medias.length === 1">
            <van-image width="100%" fit="cover" :src="mediaData.Medias[0].MediaPath"></van-image>
        </div>
        <div class="card-body">
            <p class="card-text">{{mediaData.Description}}</p>
            <p v-if="mediaData.Tags.length > 0">
                <router-link to="/media/tag-media-list">
                    <van-tag v-for="(tag, index) in mediaData.Tags" :key="index" class="media-tag" plain round >{{tag.Name}}</van-tag>
                </router-link>
            </p>
        </div>
        <div class="card-bottom">

        </div>
    </div>
</template>

<script>
    import {Image, Tag} from 'vant';
    export default {
        name: "MediaCard",
        props: ['mediaData', 'keyIndex'],
        components: {
            [Image.name]: Image,
            [Tag.name]: Tag,
        },
        methods: {
        }
    }
</script>

<style scoped>
    .media-tag {
        margin-right: 0.5rem;
    }
</style>