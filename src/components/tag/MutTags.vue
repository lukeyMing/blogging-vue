<template>
    <div class="mut-tags">
        <div class="tag-scroll">
            <div class="tag-box">
                <span class="tag" :class="tagClass(tag)" v-for="(tag, index) in tags" :key="index" @click="toggleTag(tag)">
                    {{ tag.text }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {Tag, Icon} from 'vant';
    export default {
        props: [
            "tags",
        ],
        components: {
            [Tag.name]:Tag,
            [Icon.name]:Icon,
        },
        data() {
            return {
                tagsValue: [],
            }
        },
        methods: {
            toggleTag(tag) {
                const index = this.tagsValue.findIndex((t) => {
                    return t === tag.value;
                });
                if (index >= 0){
                    this.tagsValue.splice(index, 1);
                }else{
                    this.tagsValue.push(tag.value);
                }
                this.$emit("click", this.tagsValue)
            },
            tagClass(tag) {
                const isSelected = this.tagsValue.includes(tag.value);
                return {'active':isSelected}
            }
        }
    }
</script>

<style scoped>
    .mut-tags {
        position: relative;
        background: #ffffff;
        padding: 0 12px;
    }
    .tag {
        margin: 3px;
        cursor: pointer;
    }
    .tag.active {
        color: #ed1324;
    }
    .tag-scroll {
        overflow: hidden;
        overflow-x: auto;
        padding:10px 0;
    }
    .tag-box{
        min-width: 500px;
    }
</style>
